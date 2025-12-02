import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import loginBgImage from "@/assets/images/login-bg.svg";

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
      {/* Main Content - Form centered */}
      <div className="flex flex-1 items-center justify-center px-6 md:px-10">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
