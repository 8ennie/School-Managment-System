import { Role } from './role.model';

export class User {
    constructor(
        public username: string,
        public email: string,
        public id: string,
        public roles: Role[],
        private person,
        private _token: string,
        private _tokenExpirationDate: Date
      ) {}

      get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
        }
        return this._token;
      }
}
