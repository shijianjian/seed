export enum ContentEnum {
    FORM, TABLE 
}  

export function ContentEnumDecorator(constructor: Function) {
    constructor.prototype.ContentEnum = ContentEnum;
}

export enum ActionEnum {
    CREATE, EDIT, DELETE
}

export function ActionEnumDecorator(constructor: Function) {
    constructor.prototype.ActionEum = ActionEnum;
}