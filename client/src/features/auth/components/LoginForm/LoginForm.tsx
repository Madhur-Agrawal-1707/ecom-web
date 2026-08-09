import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input } from "@/shared/components";
import { PasswordInput } from "../PasswordInput";
import { useLogin } from "../../hooks";
import { loginSchema, type LoginFormValues } from "../../schemas/auth.schemas";

interface LocationState {
  from?: { pathname: string };
}

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: () => {
        const state = location.state as LocationState | null;
        const redirectTo = state?.from?.pathname ?? "/";
        navigate(redirectTo, { replace: true });
      },
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        required
        errorText={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        autoComplete="current-password"
        required
        errorText={errors.password?.message}
        {...register("password")}
      />

      {login.isError && (
        <p role="alert" className="text-sm text-[var(--color-danger)]">
          {login.error.message}
        </p>
      )}

      <Button type="submit" fullWidth isLoading={login.isPending}>
        Log In
      </Button>
    </form>
  );
}