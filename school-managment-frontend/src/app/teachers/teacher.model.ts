import { HateoasEntity } from '../shared/hateoas-entity';
import { LeaveDay } from '../leave-days/leave-day.model';

export class Teacher extends HateoasEntity {
    public id?: number;
    firstName: string;
    lastName: string;

    gender: string;
    birthday?: Date;

    subjects: any[];

    leaveDays: LeaveDay[];

    daysWorking: string[];

    substituteTeacher: boolean;

    // HelperFields
    fullName?: string = this.firstName + ' ' + this.lastName;
    officialName?: string = this.gender === 'MALE' ? 'Mr. ' : 'Ms. ' + this.firstName?.charAt(0) + this.lastName;
    optionLable?;
    present?;
    
    public isPresent(day: string): boolean {
        return this.daysWorking.includes(day.toUpperCase());
    }
}
