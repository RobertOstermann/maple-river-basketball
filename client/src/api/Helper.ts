import { AxiosResponse } from "axios";

export default class Helper {
  public static getApiRoute = () => {
    let api = "http://localhost:3001/api/v1";
    if (process.env.NODE_ENV === "production") {
      api = `${window.location.origin}/api/v1`;
    }

    return api;
  };

  public static DownloadCSV(response: AxiosResponse<any, any>, title: string) {
    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 0);
    link.remove();
  }
}
