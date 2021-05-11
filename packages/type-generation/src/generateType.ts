/* eslint-disable prefer-const */
export type TypeMap =
  | NumberType
  | BooleanType
  | StringType
  | ObjectType
  | RefType
  | ArrayType;
export type CommonType = {
  description?: string;
};

export interface TypeDefinitions {
  [x: string]: TypeMap;
}

export interface NumberType extends CommonType {
  type: 'integer';
}

export interface BooleanType extends CommonType {
  type: 'boolean';
}

export interface StringType extends CommonType {
  type: 'string';
  enum?: string[];
}

export interface RefType extends CommonType {
  type: null;
  originalRef: string;
}

export interface ObjectType extends CommonType {
  type: 'object';
  properties: {
    [x: string]: TypeMap;
  };
}

export interface ArrayType extends CommonType {
  type: 'array';
  items: TypeMap;
}
