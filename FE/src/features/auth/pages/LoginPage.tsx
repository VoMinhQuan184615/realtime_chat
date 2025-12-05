import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/layouts";
import loginBgImage from "@/assets/images/login-bg.svg?url";

export default function LoginPage() {
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
          <LoginForm />
        </AuthLayout>
      </div>
    </div>
  );
}
