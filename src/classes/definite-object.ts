import { DefiniteObjectPropValidationError, TypeValidationError } from '@/classes/error';
import { checkNotEmpty, checkType }                               from '@/classes/validation';

/**
 * Класс описания объектов
 */
export class DefiniteObjectDescription {
    name: string;
    props: DefiniteObjectProps = {};

    constructor( name: string ) {
        this.name = name;
    }

    single<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectSingleProp<T> ): this {
        this.props[key] = new DefiniteObjectSingleProp( options );
        return this;
    }

    dynamic<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectDynamicProp<T> ): this {
        this.props[key] = new DefiniteObjectDynamicProp( options );
        return this;
    }

    array<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectArrayProp<T> ): this {
        this.props[key] = new DefiniteObjectArrayProp( options );
        return this;
    }

    map<T extends DefiniteObjectPropTypes>( key: string, options: DefiniteObjectMapProp<T> ): this {
        this.props[key] = new DefiniteObjectMapProp( options );
        return this;
    }

    extend( name: string ): DefiniteObjectDescription {
        const extend = new DefiniteObjectDescription( name );
        extend.props = Object.assign( {}, this.props );

        return extend;
    }

    /**
     * Проверка переданного объекта на соответствие описанию
     *
     * @param {O} object
     * @param {{rootObject?: O}} options
     * @return {O}
     */
    validate<O extends DefiniteObjectEntity>(
        object: O,
        options: {
            rootObject?: O;
        } = {},
    ): O {
        const { name, props } = this;
        const result: DefiniteObjectEntity = {};
        const { rootObject = object } = options;

        // Пустое значение
        if ( !checkNotEmpty( object ) ) {
            throw new TypeValidationError( name, object );
        }

        // Не объект
        if ( object.constructor !== Object ) {
            throw new TypeValidationError( name, object );
        }

        for ( const [ prop, options ] of Object.entries( props ) ) {
            const value = object[prop];

            try {
                if ( options instanceof DefiniteObjectMapProp ) {
                    const array = checkType( value, Array, undefined );
                    result[prop] = array.map( item => checkType( item, options.type, options.arrayOf ) );
                } else if ( options instanceof DefiniteObjectArrayProp ) {
                    result[prop] = checkType( value, options.type, options.arrayOf );
                } else {
                    const type = ( options instanceof DefiniteObjectDynamicProp )
                        ? options.type( rootObject )
                        : options.type;

                    result[prop] = checkType( value, type );
                }
            } catch ( e ) {
                if ( e instanceof TypeValidationError ) {
                    const required = ( typeof options.required === 'function' )
                        ? options.required( rootObject )
                        : options.required;

                    if ( required ) {
                        const { expected, got } = e;
                        throw new DefiniteObjectPropValidationError( prop, name, expected, got );
                    } else if ( options.default !== undefined ) {
                        result[prop] = options.default;
                    }
                } else {
                    throw e;
                }
            }
        }

        return <O>result;
    }
}

/**
 * Класс описания свойства, состоящего из одного значения
 */
export class DefiniteObjectSingleProp<T extends DefiniteObjectPropTypes> {
    public readonly type: T | T[];
    public readonly required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    public readonly default?: DefiniteObjectPropValueType<T>;

    constructor( options: DefiniteObjectSingleProp<T> ) {
        this.type = options.type;
        this.required = options.required;
        this.default = options.default;
    }
}

/**
 * Класс описания свойства с динамическим типом
 */
export class DefiniteObjectDynamicProp<T extends DefiniteObjectPropTypes> {
    public readonly type: ( object: DefiniteObjectEntity ) => T;
    public readonly required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    public readonly default?: DefiniteObjectPropValueType<T>;

    constructor( options: DefiniteObjectDynamicProp<T> ) {
        this.type = options.type;
        this.required = options.required;
        this.default = options.default;
    }
}

/**
 * Класс описания свойства, состоящего из массива значений
 */
export class DefiniteObjectArrayProp<T extends DefiniteObjectPropTypes> {
    public readonly type: ArrayConstructor = Array;
    public readonly arrayOf: T | T[];
    public readonly required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    public readonly default?: DefiniteObjectPropValueType<T>[];

    constructor( options: DefiniteObjectArrayProp<T> ) {
        this.arrayOf = options.arrayOf;
        this.required = options.required;
        this.default = options.default;
    }
}

/**
 * Класс описания свойства, являющегося объектом с численными ключами
 */
export class DefiniteObjectMapProp<T extends DefiniteObjectPropTypes> {
    public readonly type: ArrayConstructor = Array;
    public readonly arrayOf: T | T[];
    public readonly required: boolean | ( ( object: DefiniteObjectEntity ) => boolean );
    public readonly default?: DefiniteObjectPropValueType<T>[];

    constructor( options: DefiniteObjectArrayProp<T> ) {
        this.arrayOf = options.arrayOf;
        this.required = options.required;
        this.default = options.default;
    }
}
