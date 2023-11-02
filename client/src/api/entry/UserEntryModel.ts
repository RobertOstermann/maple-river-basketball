import EntryModel from "./EntryModel";

export default interface UserEntryModel extends EntryModel {
  firstName?: string;
  lastName?: string;
}
