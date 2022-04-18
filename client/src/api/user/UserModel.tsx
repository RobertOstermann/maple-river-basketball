import EntryModel from "../entry/EntryModel";

export default interface UserModel {
  id?: number;
  authId?: string;
  permissionLevel?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  graduationYear?: number;
  entries?: EntryModel[];
}
