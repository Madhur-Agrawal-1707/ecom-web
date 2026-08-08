import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/shared/components";
import { PasswordInput } from "../PasswordInput";
import { useRegister } from "../../hooks";
import { registerSchema, type RegisterFormValues } from "../../schemas/auth.schemas";

export function RegisterForm() {
  const navigate = useNavigate();
  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(({ confirmPassword: _confirmPassword, ...payload }) => {
    registerUser.mutate(payload, {
      onSuccess: () => navigate("/"),
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Full name"
        autoComplete="name"
        required
        errorText={errors.name?.message}
        {...register("name")}
      />

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
        autoComplete="new-password"
        required
        errorText={errors.password?.message}
        helperText={
          !errors.password ? "At least 8 characters, with a number and both cases" : undefined
        }
        {...register("password")}
      />

      <PasswordInput
        label="Confirm password"
        autoComplete="new-password"
        required
        errorText={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {registerUser.isError && (
        <p role="alert" className="text-sm text-[var(--color-danger)]">
          {registerUser.error.message}
        </p>
      )}

      <Button type="submit" fullWidth isLoading={registerUser.isPending}>
        Create Account
      </Button>
    </form>
  );
}