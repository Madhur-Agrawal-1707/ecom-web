import { Link } from "react-router-dom";
import { Typography } from "@/shared/components/Typography/Typography";
import { AuthLayout } from "../../components/AuthLayout";
import { LoginForm } from "../../components/LoginForm";

export function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue shopping">
      <LoginForm />

      <Typography variant="bodySmall" className="mt-6 text-center text-text-muted">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-medium text-(--color-text) hover:underline">
          Create one
        </Link>
      </Typography>
    </AuthLayout>
  );
}