import { ArrayType, RefType, StringType } from './generateType';
import fs = require('fs');
import promise1 = require('../mock-data/promise1');
import eslint = require('eslint');
import { ObjectType, TypeDefinitions, TypeMap } from 'src/generateType';

const types = async () => {
  const res = await promise1;
  return res.definitions as TypeDefinitions;
};

(async function main() {
  // create models folder
  fs.rmdirSync('models', { recursive: true });
  fs.mkdirSync('models');

  const res = await types();
  const typeTxtArr = await getTypeTxtArr(res);

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
    await ESLint.outputFixes(results);
  });

  // fix lint problems
}

/**
 * generate single or multiple type files.
 * @param {TypeDefinitions} definitionsObject the object of related types.
 * @return {Promise<string>} the string format of definitions object
 */
async function getTypeTxtArr(
  definitionsObject: TypeDefinitions
): Promise<{ txt: string; name: string }[]> {
  const exportArr: string[] = [];
  const formatTypeMap = {
    integer: (_item: TypeMap) => 'number',
    boolean: (_item: TypeMap) => 'boolean',
    string: (item: StringType) => {
      if (!item.enum) {
        return 'string';
      } else {
        return item.enum.map((i) => `'${i}'`).join(' | ');
      }
    },
    originalRef: (item: RefType) => {
      exportArr.push(item.originalRef);
      return item.originalRef;
    },
    object: (_item: TypeMap) => {
      return '{}';
    },
    array: (item: ArrayType) => {
      let itemStringType = '';
      itemStringType = formatTypeMap[item.items.type || 'originalRef'](
        // @ts-ignore
        item.items
      );
      return `${itemStringType}[]`;
    },
  };
  const typeTxtArr: { txt: string; name: string }[] = [];
  for (const i in definitionsObject) {
    if (definitionsObject.hasOwnProperty(i)) {
      const name = i.replace(/«(.*)»/g, '$1');
      let tempTypeTxt = `export type ${name} = {`;
      const tempObj = definitionsObject[i] as ObjectType;
      for (const j in tempObj.properties) {
        if (tempObj.properties.hasOwnProperty(j)) {
          const { type, description } = tempObj.properties[j];
          if (description) tempTypeTxt += `\n  // ${description}`;
          tempTypeTxt += `\n  ${j}?: ${formatTypeMap[type || 'originalRef'](
            // @ts-ignore
            tempObj.properties[j]
          )};`;
        }
      }
      if (exportArr.length) {
        const unique = [...new Set(exportArr)];
        let exportTxt = '';
        unique.forEach((name) => {
          exportTxt += `import { ${name} } from './${name}'\n`;
        });
        tempTypeTxt = exportTxt + '\n' + tempTypeTxt;
      }
      tempTypeTxt += '\n};\n';
      typeTxtArr.push({
        name,
        txt: tempTypeTxt,
      });
    }
  }
  return typeTxtArr;
}
