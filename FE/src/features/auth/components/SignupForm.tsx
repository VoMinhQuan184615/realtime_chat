import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AUTH_VALIDATION, AUTH_ROUTES } from "@/features/auth/constants";
import { SignupCredentials } from "@/types/auth";

export function SignupForm() {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupCredentials>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      mail: "",
      phone: "",
      password: "",
      confirmPassword: "",
      avatarImage: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data: SignupCredentials) => {
    signup(data);
  };

  const isFormValid = isValid && !isLoading;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">CREATE ACCOUNT</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Sign up to get started with our platform
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {/* Username */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            className={`border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            {...register("username", {
              required: AUTH_VALIDATION.USERNAME_REQUIRED,
              minLength: {
                value: 3,
                message: AUTH_VALIDATION.USERNAME_MIN_LENGTH,
              },
            })}
          />
          {errors.username && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-md mt-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errors.username.message}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="mail">Email</Label>
          <Input
            id="mail"
            type="email"
            placeholder="Enter your email"
            className={`border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 ${
              errors.mail
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            {...register("mail", {
              required: AUTH_VALIDATION.EMAIL_REQUIRED,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: AUTH_VALIDATION.EMAIL_INVALID,
              },
            })}
          />
          {errors.mail && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-md mt-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errors.mail.message}</span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            className={`border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            {...register("phone", {
              required: AUTH_VALIDATION.PHONE_REQUIRED,
              pattern: {
                value: /^[0-9]{10,}$/,
                message: AUTH_VALIDATION.PHONE_INVALID,
              },
            })}
          />
          {errors.phone && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-md mt-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errors.phone.message}</span>
            </div>
          )}
        </div>

        {/* Avatar Image */}
        <div className="grid gap-2">
          <Label htmlFor="avatarImage">Avatar URL (Optional)</Label>
          <Input
            id="avatarImage"
            placeholder="Enter avatar image URL"
            className="border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("avatarImage")}
          />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            className={`border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            {...register("password", {
              required: AUTH_VALIDATION.PASSWORD_REQUIRED,
              minLength: {
                value: 8,
                message: AUTH_VALIDATION.PASSWORD_MIN_LENGTH,
              },
            })}
          />
          {errors.password && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-md mt-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errors.password.message}</span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="**********"
            className={`border p-2 rounded bg-white text-gray-900 placeholder:text-gray-500 placeholder:font-semibold focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            {...register("confirmPassword", {
              required: AUTH_VALIDATION.CONFIRM_PASSWORD_REQUIRED,
              validate: (value) =>
                value === password || AUTH_VALIDATION.CONFIRM_PASSWORD_MISMATCH,
            })}
          />
          {errors.confirmPassword && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-md mt-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errors.confirmPassword.message}</span>
            </div>
          )}
        </div>

        {/* Sign Up Button */}
        <Button type="submit" className="w-full" disabled={!isFormValid}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button variant="outline" className="w-full" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 mr-2"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href={AUTH_ROUTES.LOGIN} className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
