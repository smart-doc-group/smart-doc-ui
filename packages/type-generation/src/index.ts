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
    // const results = await new ESLint({ fix: true }).lintFiles([
    //   `models/${i.name}.ts`,
    // ]);
    // await ESLint.outputFixes(results);
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
  let exportArr: string[] = [];
  const formatTypeMap = {
    integer: (_item: TypeMap) => 'number',
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
        exportArr.push(item.originalRef);
        return item.originalRef;
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
            if (description) itemStringType += `\n    // ${description}`;
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
  return typeTxtArr;
}
