import { HateoasEntity } from '../shared/hateoas-entity';
import { Teacher } from '../teachers/teacher.model';

export class Lesson extends HateoasEntity {

    id: number;

    grade;

    subject;

    teacher: Teacher;

    lessonTime;
}
