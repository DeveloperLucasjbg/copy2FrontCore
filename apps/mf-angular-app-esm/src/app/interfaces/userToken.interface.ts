export interface UserTokenInterface {
    uid: number;
    type: string;
    roles: string[];
    iat: number;
    exp: number;
}