import { Button, Input, Label } from "@/components/ui";
import { AUTH_ROUTES } from "@/features/auth/constants";

export function ForgotPasswordForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password?</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
        <div className="text-center text-sm">
          Remember your password?{" "}
          <a href={AUTH_ROUTES.LOGIN} className="underline underline-offset-4">
            Back to login
          </a>
        </div>
      </div>
    </form>
  );
}
