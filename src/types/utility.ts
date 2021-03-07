type EmptyTypes = undefined | null;
type PrimitiveTypes = number | string | boolean;
type PrimitiveConstructorTypes = NumberConstructor | StringConstructor | BooleanConstructor;
type PrimitiveByConstructorType<T extends PrimitiveConstructorTypes> =
    T extends NumberConstructor ? number :
        T extends StringConstructor ? string :
            T extends BooleanConstructor ? boolean :
                never;
type NotEmptyAny = PrimitiveTypes | Array<unknown> | object;