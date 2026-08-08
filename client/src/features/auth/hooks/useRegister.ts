import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiErrorShape } from "@/lib/axios";
import { registerRequest, authKeys } from "../api/auth.api";
import { setAccessToken } from "../services/token.service";
import { setCredentials, setError, useAppDispatch } from "../store";
import type { AuthResponseData, RegisterPayload } from "../types/auth.types";

export function useRegister() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<AuthResponseData, ApiErrorShape, RegisterPayload>({
    mutationFn: (payload) => registerRequest(payload),
    onSuccess: ({ user, accessToken }) => {
      setAccessToken(accessToken);
      dispatch(setCredentials({ user }));
      queryClient.setQueryData(authKeys.me, user);
    },
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });
}