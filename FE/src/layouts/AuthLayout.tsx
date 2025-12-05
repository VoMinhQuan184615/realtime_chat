import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-2xl p-8 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
