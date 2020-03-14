import { LessonInstance } from './lesson-instance.model';
import { Teacher } from '../teachers/teacher.model';
import { LeaveDay } from '../leave-days/leave-day.model';

export class SubLesson extends LessonInstance{
    
    public task;

    public substituteTeacher:Teacher;

    public leaveDay:LeaveDay;

    public _embedded:LessonInstance;

}