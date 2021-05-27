import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import eslint from 'eslint';
import { MultiBar } from './progress';
import fetchData, { FetchDataRes } from 'src/fetchData';
import { TypeDefinitions, TypeMap } from 'src/generateType';
import { hideTerminalCursor, showTerminalCursor } from 'src/util';

(async function main() {
  const resArr = await fetchData();

  if (!resArr || resArr.length === 0) return;
  // create models folder
  resArr.forEach((i) => fs.mkdirSync(i.dir, { recursive: true }));

  const api = process.argv.find((i) => /^--api=/.test(i))?.slice(6);

  const startTime = Number(new Date());
  if (!api) {
    // when there is no specific api,
    // generate files for each module in a loop
    await resArr.forEach(async (i) => {
      const typeTxtArr = await getTypeTxtArr(i.definitions);
      const multiBar = new MultiBar({
        total: Object.keys(i.definitions).length,
      });
      hideTerminalCursor();
      typeTxtArr.forEach(async (typeTxt) => {
        generateTypeFiles(typeTxt, i.dir);
        multiBar.tick({ file: typeTxt.name, module: i.name });
      });
      showTerminalCursor();
      // eslint-disable-next-line no-console
      if (multiBar.isComplete()) console.log('\n');
    });
    // eslint-disable-next-line no-console
    console.log(
      `Generated files ${chalk.greenBright('successfully')} in ${(
        (Number(new Date()) - startTime) /
        1000
      ).toFixed(1)}s`
    );
  } else {
    // when there is a specific api,
    const typeNames = getTypeNamesByApi(resArr, api);
    if (!typeNames) throw Error(chalk.red('The api was not found!'));
    const res = resArr[0];

    const typeTxtArr = await getTypeTxtArr(res.definitions, typeNames);
    const multiBar = new MultiBar({
      total: typeTxtArr.length,
    });
    hideTerminalCursor();
    // generate files for each module in a loop
    typeTxtArr.forEach(async (typeTxt) => {
      generateTypeFiles(typeTxt, res.dir);
      multiBar.tick({ file: typeTxt.name, module: res.name });
    });
    showTerminalCursor();
    // eslint-disable-next-line no-console
    console.log(
      '\n' +
        `Generated files ${chalk.greenBright('successfully')} in ${(
          (Number(new Date()) - startTime) /
          1000
        ).toFixed(1)}s`
    );
  }
})().catch((err) => {
  if (err) throw err;
});

/**
 * obtain the TypeNames via specific api,
 * @param {FetchDataRes[]} resArr the data fetched from fetchData function
 * @param {string} api the api argument we typed
 * @return {string[]} return TypeNames that matches the rule
 */
function getTypeNamesByApi(resArr: FetchDataRes[], api: string) {
  const apiTypeArr: { [x: string]: string[] }[] = [];

  resArr.forEach(({ paths }, index) => {
    apiTypeArr.push({});
    for (const i in paths) {
      if (!paths.hasOwnProperty(i)) continue;
      const str = JSON.stringify(paths[i]);
      apiTypeArr[index][i] = [
        ...new Set(
          [...str.matchAll(/[\s{;,'"]originalRef['"]:\s*['"](.+?)['"]/g)].map(
            (i) => i[1]
          )
        ),
      ];
    }
  });

  const typeNames = apiTypeArr[0][api];
  return typeNames;
}

/**
 * generate multiple type files.
 * @param {string} typeTxt the string format of type
 * @param {string} dir the path of the generated file
 */
async function generateTypeFiles(
  typeTxt: { txt: string; name: string },
  dir: string
) {
  const ESLint = eslint.ESLint;
  // create type files
  const filePath = path.join(dir, `${typeTxt.name}.ts`);
  fs.writeFileSync(filePath, typeTxt.txt);
  // fix lint problems
  const results = await new ESLint({ fix: true }).lintFiles([filePath]);
  await ESLint.outputFixes(results);
}

/**
 * obtain the info of multiple type files through text form
 * @param {TypeDefinitions} definitionsObject the object of related types
 * @param {string[]} typeNames the specific types that will be generated
 * @return {Promise<string>} the string format of definitions object
 */
async function getTypeTxtArr(
  definitionsObject: TypeDefinitions,
  typeNames?: string[]
): Promise<{ txt: string; name: string }[]> {
  let exportArr: string[] = [];
  const typeTxtArr: { txt: string; name: string }[] = [];
  const getTypeTxtArr = (curTypeNames?: string[]) => {
    if (curTypeNames && curTypeNames.length === 0) return;
    const innerTypeNames: string[] = [];
    const formatTypeMap = {
      integer: (_item: TypeMap) => 'number',
      number: (_item: TypeMap) => 'number',
      boolean: (_item: TypeMap) => 'boolean',
      string: (item: TypeMap) => {
        if (item.type === 'string') {
          if (!item.enum) {
            return 'string';
          } else {
            return item.enum.map((i) => `'${i}'`).join(' | ');
          }
        } else {
          return 'unknown';
        }
      },
      originalRef: (item: TypeMap) => {
        if (!item.type) {
          const originalRef = item.originalRef
            .replace(/«(.*)»/g, '$1')
            .replace(/\s/g, '');
          exportArr.push(originalRef);

          innerTypeNames?.push(originalRef);
          return originalRef;
        } else {
          return 'unknown';
        }
      },
      object: (item: TypeMap) => {
        if (item.type === 'object') {
          let itemStringType = '{';
          const p = item.properties;
          for (const i in p) {
            if (p.hasOwnProperty(i)) {
              const { type, description } = p[i];
              if (description)
                itemStringType += `\n//${description.replace(/\n/g, '\n//')}`;
              itemStringType += `\n${i}?:${formatTypeMap[type || 'originalRef'](
                p[i]
              )};`;
            }
          }
          itemStringType += '\n}';
          return itemStringType;
        } else {
          return 'unknown';
        }
      },
      array: (item: TypeMap) => {
        if (item.type === 'array') {
          let itemStringType = '';
          const temp = item.items.type || 'originalRef';
          itemStringType = formatTypeMap[temp](item.items);
          return `${itemStringType}[]`;
        } else {
          return 'unknown';
        }
      },
    };
    for (const i in definitionsObject) {
      if (
        definitionsObject.hasOwnProperty(i) &&
        (!curTypeNames || curTypeNames.includes(i))
      ) {
        const name = i.replace(/«(.*)»/g, '$1').replace(/\s/g, '');
        let tempTypeTxt = `export type ${name} = {`;
        const tempObj = definitionsObject[i];
        for (const j in tempObj.properties) {
          if (tempObj.properties.hasOwnProperty(j)) {
            const { type, description } = tempObj.properties[j];
            if (description)
              tempTypeTxt += `\n//${description.replace(/\n/g, '\n//')}`;
            tempTypeTxt += `\n${j}?: ${formatTypeMap[type || 'originalRef'](
              tempObj.properties[j]
            )};`;
          }
        }
        const noOwnExportArr = exportArr.filter((i) => i !== name);

        if (noOwnExportArr.length) {
          const unique = [...new Set(noOwnExportArr)];
          let exportTxt = '';
          unique.forEach((name) => {
            exportTxt += `import { ${name} } from './${name}';\n`;
          });
          exportTxt += '\n';
          tempTypeTxt = exportTxt + tempTypeTxt;
        }
        exportArr = [];
        tempTypeTxt += '\n};\n';
        typeTxtArr.push({
          name,
          txt: tempTypeTxt,
        });
      }
    }
    typeNames && getTypeTxtArr(innerTypeNames);
  };
  getTypeTxtArr(typeNames);
  return typeTxtArr;
}
