export default class Helper {
  static getApiRoute = () => {
    let api = "http://localhost:3001/api/v1";
    if (process.env.NODE_ENV === "production") {
      api = `${window.location.origin}/api/v1`;
    }

    return api;
  };
}
