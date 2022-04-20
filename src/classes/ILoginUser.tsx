import IRole from "./IRole";

export default interface ILoginUser {
    _id: string;
    IsHost: boolean;
    IsSuperAdmin: boolean;
    FirstName: string;
    LastName: string;
    Email: string;
    Role: IRole;
    ProfilePhoto: string;
}