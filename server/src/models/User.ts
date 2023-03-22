import Entry from "./Entry";

export default interface User {
  id: number;
  authId: string;
  permissionLevel: number;
  email?: string;
  firstName: string;
  lastName: string;
  graduationYear?: number;
  entries?: Entry[];
  active: boolean;
}
