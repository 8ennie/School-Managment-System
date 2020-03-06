export class Teacher {
    public id?: number;
    firstName: string;
    lastName: string;

    gender: string;
    birthday?: Date;

    subjects: any[];

    _links;

    // HelperFields
    fullName?: string;
    optionLable?;
}
