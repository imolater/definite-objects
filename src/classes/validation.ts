import {
    TypeValidationError,
    ValidationError,
} from '@/classes/error';
import {
    DefiniteObjectDescription,
} from '@/classes/definite-object';

/**
 * Проверка на не "пустое" значение
 *
 * @param value
 * @returns {value is NotEmptyAny}
 */
export function checkNotEmpty(
    value: unknown,
): value is NotEmptyAny {
    return (
        value !== undefined &&
        value !== null
    );
}

/**
 * Проверка типа примитивов, массивов
 * и объектов, описанных с помощью {@link DefiniteObjectDescription}
 *
 * @param value
 * @param {T} type
 * @returns {DefiniteObjectPropValueType<T>}
 */
export function checkType<T extends DefiniteObjectPropTypes>(
    value: unknown,
    type: T | T[],
): DefiniteObjectPropValueType<T>;
export function checkType<T extends DefiniteObjectPropTypes>(
    value: unknown,
    type: ArrayConstructor,
    arrayOf: T | T[],
): DefiniteObjectPropValueType<T>[];
export function checkType<T extends DefiniteObjectPropTypes>(
    value: unknown,
    type: T | T[],
    arrayOf?: T | T[],
): DefiniteObjectPropValueType<T> | DefiniteObjectPropValueType<T>[] {
    const types = Array.isArray( type ) ? type : [ type ];
    let error: ValidationError | null = null;

    for ( const type of types ) {
        // Не предъявлены значения к типу
        if ( type === undefined ) {
            return <DefiniteObjectPropValueType<T>>value;
        }

        // Пустое значение
        if ( type === null ) {
            if ( value == null ) {
                return <DefiniteObjectPropValueType<T>>value;
            } else {
                error = new TypeValidationError( String( type ), value );
                continue;
            }
        }

        // Некорректное значение
        if ( !checkNotEmpty( value ) ) {
            error = new TypeValidationError( type.name, value );
            continue;
        }

        // Примитивы
        if ( type === Number || type === String || type === Boolean ) {
            if ( value.constructor === <PrimitiveConstructorTypes>type ) {
                return <DefiniteObjectPropValueType<T>>value;
            } else {
                error = new TypeValidationError( type.name, value );
                continue;
            }
        }

        // Объекты, описанные с помощью {@link DefiniteObjectDescription}
        if ( type instanceof DefiniteObjectDescription ) {
            if ( value.constructor === Object ) {
                try {
                    return <DefiniteObjectPropValueType<T>>type.validate( <DefiniteObjectEntity>value );
                } catch ( e ) {
                    error = e;
                    continue;
                }
            } else {
                error = new TypeValidationError( type.name, value );
                continue;
            }
        }

        // Массивы
        if ( type === Array ) {
            if ( value.constructor === Array ) {
                // Не предъявлены требования к типу элементов массива
                if ( arrayOf === undefined ) {
                    return <DefiniteObjectPropValueType<T>[]>value;
                }

                try {
                    return ( <DefiniteObjectPropValueType<T>[]>value ).map( item => checkType( item, arrayOf ) );
                } catch ( e ) {
                    error = e;
                    continue;
                }
            } else {
                error = new TypeValidationError( type.name, value );
                continue;
            }
        }

        // Неподдерживаемый тип
        error = new TypeValidationError( type.name, value );
    }

    throw error;
}