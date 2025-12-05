import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import loginBgImage from "@/assets/images/login-bg.svg?url";

export function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${loginBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Main Content - Form centered */}
      <div className="flex flex-1 items-center justify-center px-6 md:px-10">
        <AuthLayout>
          <SignupForm />
        </AuthLayout>
      </div>
    </div>
  );
}
