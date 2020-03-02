import { HateoasEntity } from '../shared/hateoas-entity';

export class Student extends HateoasEntity {

    public id?: number;

    public firstName: string;
    public lastName: string;

    public grade?;

    public gender: string;

    public _links;

    public _embedded;

    // getAge(): number{
    //     const today = new Date();
    //     let age = today.getFullYear() - this.birthday.getFullYear();
    //     const m = today.getMonth() - this.birthday.getMonth();
    //     if(m < 0 || (m == 0 && today.getDate() < this.birthday.getDate())){
    //         age--;
    //     }
    //     return age;
    // }

}
