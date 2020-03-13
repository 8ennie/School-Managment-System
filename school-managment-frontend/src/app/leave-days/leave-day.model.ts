import { HateoasEntity } from '../shared/hateoas-entity';

export class LeaveDay {

    constructor(
        public date?,
        public description?,
        public type?,
        public person?
    ) {
    }
    public _links?;
}
