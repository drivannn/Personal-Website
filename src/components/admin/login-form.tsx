"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        setMessage(error.message);
        return;
      }

      const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");

      if (adminError || !isAdmin) {
        await supabase.auth.signOut();
        setMessage("Login succeeded, but this account is not registered as an admin.");
        return;
      }

      router.push(searchParams.get("next") ?? "/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="text-sm text-zinc-300" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-2 w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-red-400"
          {...register("email")}
        />
        {errors.email ? <p className="mt-2 text-sm text-red-300">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="text-sm text-zinc-300" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="mt-2 w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-red-400"
          {...register("password")}
        />
        {errors.password ? <p className="mt-2 text-sm text-red-300">{errors.password.message}</p> : null}
      </div>
      {message ? <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-200">{message}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
        Login
      </button>
    </form>
  );
}
