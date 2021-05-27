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
  [x: string]: ObjectType;
}

export interface TypeObject {
  integer: NumberType;
  number: NumberType;
  boolean: BooleanType;
  string: StringType;
  originalRef: RefType;
  object: ObjectType;
  array: ArrayType;
}

export interface NumberType extends CommonType {
  type: 'integer' | 'number';
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
