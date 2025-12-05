import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { AuthLayout } from "@/layouts";
import loginBgImage from "@/assets/images/login-bg.svg?url";

export default function ForgotPasswordPage() {
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
      {/* Header with Acme Inc */}
      <div className="flex justify-center pt-8 pb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-medium text-lg"
        >
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded flex items-center justify-center text-sm font-bold">
            A
          </div>
          <span>Acme Inc.</span>
        </a>
      </div>

      {/* Main Content - Form centered */}
      <div className="flex flex-1 items-center justify-center px-6 md:px-10">
        <AuthLayout>
          <ForgotPasswordForm />
        </AuthLayout>
      </div>
    </div>
  );
}
