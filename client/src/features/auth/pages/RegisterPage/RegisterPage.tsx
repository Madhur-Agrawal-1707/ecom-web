import { Link } from "react-router-dom";
import { Typography } from "@/shared/components";
import { AuthLayout } from "../../components/AuthLayout";
import { RegisterForm } from "../../components/RegisterForm";

export function RegisterPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Join us to start shopping">
      <RegisterForm />

      <Typography variant="bodySmall" className="mt-6 text-center text-[var(--color-text-muted)]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[var(--color-text)] hover:underline">
          Log in
        </Link>
      </Typography>
    </AuthLayout>
  );
}