interface DefiniteObjectEntity {
    [key: string]: unknown;
}

interface DefiniteObjectProps {
    [key: string]:
        DefiniteObjectSingleProp<DefiniteObjectPropTypes> |
        DefiniteObjectDynamicProp<DefiniteObjectPropTypes> |
        DefiniteObjectArrayProp<DefiniteObjectPropTypes>;
}

type DefiniteObjectPropTypes =
    EmptyTypes
    | PrimitiveConstructorTypes
    | ArrayConstructor
    | DefiniteObjectDescription;

type DefiniteObjectPropValueType<T extends DefiniteObjectPropTypes> =
    T extends PrimitiveConstructorTypes ? PrimitiveByConstructorType<T> :
        T extends DefiniteObjectDescription ? DefiniteObjectEntity :
            T extends null ? null :
                T extends undefined ? undefined :
                    never;

interface DefiniteObjectDescription {
    name: string;
    props: DefiniteObjectProps;
    single<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectSingleProp<T> ): this;
    dynamic<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectDynamicProp<T> ): this;
    array<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectArrayProp<T> ): this;
    map<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectArrayProp<T> ): this;
    extend( name: string ): this;
}

interface DefiniteObjectSingleProp<T extends DefiniteObjectPropTypes> {
    type: T | T[];
    required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    default?: DefiniteObjectPropValueType<T>;
}

interface DefiniteObjectDynamicProp<T extends DefiniteObjectPropTypes> {
    type: ( object: DefiniteObjectEntity ) => T;
    required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    default?: DefiniteObjectPropValueType<T>;
}

interface DefiniteObjectArrayProp<T extends DefiniteObjectPropTypes> {
    type: ArrayConstructor;
    arrayOf: T | T[];
    required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    default?: DefiniteObjectPropValueType<T>[];
}

interface DefiniteObjectMapProp<T extends DefiniteObjectPropTypes> {
    type: ArrayConstructor;
    arrayOf: T | T[];
    required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    default?: DefiniteObjectPropValueType<T>[];
}

