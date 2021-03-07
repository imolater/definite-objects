/**
 * Базовый класс ошибок
 */
class CustomError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = this.constructor.name;
        this.message = `${ this.name }: ${ this.message }`;
    }
}

/**
 * Класс ошибок валидации
 */
export class ValidationError extends CustomError {}

/**
 * Уточняющий класс ошибок валидации: Некорректный тип
 */
export class TypeValidationError extends ValidationError {
    public expected: string;
    public got: unknown;

    constructor( expected: string, got: unknown ) {
        super( `Expected value with type "${ expected }", got - "${ got }"` );

        this.expected = expected;
        this.got = got;
    }
}

/**
 * Уточняющий класс ошибок валидации: Некорректное значение описанного объекта
 */
export class DefiniteObjectPropValidationError extends ValidationError {
    constructor( prop: string, int: string, expected: string, got: unknown ) {
        super( `Expected value of prop "${ prop }" in object "${ int }" with type "${ expected }", got - "${ got }"` );
    }
}

/**
 * Уточняющий класс ошибок валидации: Некорректные параметры функции
 */
export class FunctionParamsValidationError extends ValidationError {
    constructor( funcName: string, message: string ) {
        super( `Incorrect call function "${ funcName }". Reason: ${ message }` );
    }
}