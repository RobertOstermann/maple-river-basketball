import UserModel from "./UserModel";

export default class UserHelper {
  public static sortByTotal = (first: UserModel, second: UserModel): number => {
    let firstDuration = first.entries?.reduce(
      (previous, { activityDuration }) =>
        previous + (activityDuration ? activityDuration : 0),
      0
    );
    firstDuration = firstDuration ? firstDuration : 0;

    let secondDuration = second.entries?.reduce(
      (previous, { activityDuration }) =>
        previous + (activityDuration ? activityDuration : 0),
      0
    );
    secondDuration = secondDuration ? secondDuration : 0;

    return secondDuration - firstDuration;
  };

  public static sortByCategory = (first: UserModel, second: UserModel, categoryId: number): number => {
    let firstDuration = first.entries?.filter((entry) => entry.activityType === categoryId)?.reduce(
      (previous, { activityDuration }) =>
        previous + (activityDuration ? activityDuration : 0),
      0
    );
    firstDuration = firstDuration ? firstDuration : 0;

    let secondDuration = second.entries?.filter((entry) => entry.activityType === categoryId)?.reduce(
      (previous, { activityDuration }) =>
        previous + (activityDuration ? activityDuration : 0),
      0
    );
    secondDuration = secondDuration ? secondDuration : 0;

    return secondDuration - firstDuration;
  };
}
