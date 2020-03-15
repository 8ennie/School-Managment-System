import { HateoasEntity } from '../shared/hateoas-entity';
import { LeaveDay } from '../leave-days/leave-day.model';

export class Teacher extends HateoasEntity {
    public id?: number;
    firstName: string;
    lastName: string;

    gender: string;
    birthday?: Date;

    subjects: any[];

    leaveDays:LeaveDay[];

    // HelperFields
    fullName?: string;
    optionLable?;

    officialName?: string = this.gender === 'MALE' ? 'Mr. ' : 'Ms. ' + this.lastName;
}
