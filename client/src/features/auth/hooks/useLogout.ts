import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest, authKeys } from "../api/auth.api";
import { clearAccessToken } from "../services/token.service";
import { clearCredentials, useAppDispatch } from "../store";

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      // Clear client state even if the network call failed — the user
      // clicked "log out" and expects to be logged out locally regardless.
      clearAccessToken();
      dispatch(clearCredentials());
      queryClient.removeQueries({ queryKey: authKeys.me });
    },
  });
}