import { useQuery } from "@tanstack/react-query";
import { getCurrentUserRequest, authKeys } from "../api/auth.api";

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getCurrentUserRequest,
    // A 401 here means "not logged in," not "retry me" — retrying would
    // just repeat the interceptor's own refresh attempt pointlessly.
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}