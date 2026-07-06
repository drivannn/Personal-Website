import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { LoadingState } from "@/components/loading-state";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-black px-5 text-white">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-zinc-950 p-8 shadow-2xl shadow-red-950/20">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-red-400">
          Admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Login to dashboard</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Use the admin account created in Supabase Auth.
        </p>
        <div className="mt-8">
          <Suspense fallback={<LoadingState label="Preparing login" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
