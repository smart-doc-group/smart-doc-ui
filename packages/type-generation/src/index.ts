import fs from 'fs';
import promise1 from '../mock-data/promise1';
import eslint from 'eslint';
import { ObjectType, TypeDefinitions, TypeMap } from 'src/generateType';

const apiReq = async () => {
  const res = await promise1;
  return res;
};

(async function main() {
  // create models folder
  // fs.rmdirSync('models', { recursive: true });
  if (!fs.existsSync('models')) {
    fs.mkdirSync('./models/test', { recursive: true });
  }

  const res = await apiReq();
  const paths = res.paths;
  const te: any = {};

  const api = process.argv.find((i) => /^--api=/.test(i))?.slice(6);

  for (const i in paths) {
    if (paths.hasOwnProperty(i)) {
      const str = JSON.stringify(paths[i as keyof typeof paths]);
      te[i] = [
        ...new Set(
          [...str.matchAll(/[\s{;,'"]originalRef['"]:\s*['"](.+?)['"]/g)].map(
            (i) => i[1]
          )
        ),
      ];
    }
  }

  const typeTxtArr = await getTypeTxtArr(
    res.definitions as TypeDefinitions,
    api && te[api as keyof typeof paths]
  );

  generateTypeFiles(typeTxtArr);
})().catch((err) => {
  if (err) throw err;
});

/**
 * generate single or multiple type files.
 * @param {string} typeTxtArr the string format of type.
 */
async function generateTypeFiles(typeTxtArr: { txt: string; name: string }[]) {
  const ESLint = eslint.ESLint;
  // create type files
  typeTxtArr.forEach(async (i) => {
    fs.writeFileSync(`models/${i.name}.ts`, i.txt);
    const results = await new ESLint({ fix: true }).lintFiles([
      `models/${i.name}.ts`,
    ]);
    // fix lint problems
    await ESLint.outputFixes(results);
  });
}

/**
 * generate single or multiple type files.
 * @param {TypeDefinitions} definitionsObject the object of related types.
 * @param {string[]} typeNames the specific types that will be generated.
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
                itemStringType += `\n    // ${description.replace(
                  /\n/g,
                  '\n  // '
                )}`;
              itemStringType += `\n    ${i}?: ${formatTypeMap[
                type || 'originalRef'
              ](p[i])};`;
            }
          }
          itemStringType += '\n  }';
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
        const tempObj = definitionsObject[i] as ObjectType;
        for (const j in tempObj.properties) {
          if (tempObj.properties.hasOwnProperty(j)) {
            const { type, description } = tempObj.properties[j];
            if (description)
              tempTypeTxt += `\n  // ${description.replace(/\n/g, '\n  // ')}`;
            tempTypeTxt += `\n  ${j}?: ${formatTypeMap[type || 'originalRef'](
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
