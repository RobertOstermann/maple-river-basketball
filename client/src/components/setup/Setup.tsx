import React, { useEffect } from "react";
import { useQuery, UseQueryOptions } from "react-query";

import UserModel from "../../api/user/UserModel";
import UserRequests from "../../api/user/UserRequests";
import { useStoreAuthentication } from "../../store/authentication/AuthenticationStore";
import { useStoreUser } from "../../store/user/UserStore";

export default function Setup() {
  const setUser = useStoreUser((state) => state.setUser);
  const token = useStoreAuthentication((state) => state.token);

  const queryOptions: UseQueryOptions<unknown, unknown, unknown, any> = {
    enabled: token !== "",
    refetchOnWindowFocus: false,
    retry: 1,
  };
  const queryResponse = useQuery(
    ["get-user"],
    () => UserRequests.getUser(token),
    queryOptions
  );

  useEffect(() => {
    if (queryResponse.isSuccess) {
      const data: UserModel = queryResponse.data as UserModel;
      if (!data) return;

      setUser(data);
    }
  }, [queryResponse.data, queryResponse.isSuccess, queryResponse.isError]);

  return (
    <React.Fragment />
  );
}
