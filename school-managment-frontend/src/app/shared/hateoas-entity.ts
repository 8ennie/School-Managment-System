
export class HateoasEntity {

    get resourceUrl(): string {
        if (this._links && this._links.self && this._links.self.href) {
            return this._links.self.href;
        }
        return undefined;
    }

    set resourceUrl(url: string) {
        this._links = {
            self: {
                href: url,
            },
        };
    }

    public _links: {
        self: {
            href: string;
        };
        
    };
}
