import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account on Classified.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col justify-center bg-white px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] text-zinc-900 motion-safe:animate-[cb-land-in_0.5s_ease-out_both] motion-reduce:animate-none dark:bg-black dark:text-zinc-100 sm:px-8 sm:py-8 sm:pb-8 md:py-10 lg:px-10">
      <section className="mx-auto flex w-full min-w-0 max-w-md justify-center px-0 motion-safe:animate-[cb-fade-in_0.45s_ease-out_both] motion-safe:[animation-delay:0.06s] motion-reduce:animate-none">
        <LoginForm />
      </section>
    </main>
  );
}
