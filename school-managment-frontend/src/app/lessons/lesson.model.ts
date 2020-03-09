import { HateoasEntity } from '../shared/hateoas-entity';
import { Teacher } from '../teachers/teacher.model';

export class Lesson extends HateoasEntity {


    constructor(
        ) {
        super();
    }
    public id: number;
    public grade;
    public subject;
    public teacher: Teacher;
    public lessonTime;

}
