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
  const typeTxt = await getTypeTxtArr(res);
  generateTypeFiles(typeTxt);
})().catch((err) => {
  if (err) throw err;
});

/**
 * generate single or multiple type files.
 * @param {string} typeTxt the string format of type.
 */
async function generateTypeFiles(typeTxtArr: { txt: string; name: string }[]) {
  // create type files
  typeTxtArr.forEach((i) => {
    fs.writeFileSync(`models/${i.name}.ts`, i.txt);
  });

  // fix lint problems
  const ESLint = eslint.ESLint;
  const results = await new ESLint({ fix: true }).lintFiles(['models/test.ts']);
  await ESLint.outputFixes(results);
}

/**
 * generate single or multiple type files.
 * @param {TypeDefinitions} definitionsObject the object of related types.
 * @return {Promise<string>} the string format of definitions object
 */
async function getTypeTxt(definitionsObject: TypeDefinitions): Promise<string> {
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
    $ref: (item: RefType) => item.$ref.slice(14),
    object: (_item: TypeMap) => {
      return '{}';
    },
    array: (item: ArrayType) => {
      // @ts-ignore
      const itemStringType: string = formatTypeMap[item.items.type || '$ref'](
        // @ts-ignore
        item.items
      );
      return `${itemStringType}[]`;
    },
  };
  const typeTxtArr = [];
  let tempTypeTxt = '';
  const commonString = 'export type T = {';
  for (const i in definitionsObject) {
    if (
      i === 'IPaged«CassWidgetVo»' &&
      definitionsObject[i].type === 'object'
    ) {
      const tempObj = definitionsObject[i] as ObjectType;
      tempTypeTxt += commonString;
      // eslint-disable-next-line guard-for-in
      for (const j in tempObj.properties) {
        const { type, description } = tempObj.properties[j];
        if (type) {
          if (description) tempTypeTxt += `\n  // ${description}`;
          tempTypeTxt += `\n  ${j}?: ${formatTypeMap[type || '$ref'](
            // @ts-ignore
            tempObj.properties[j]
          )};`;
        }
      }
    }
  }
  tempTypeTxt += '\n};\n';
  return tempTypeTxt;
}
