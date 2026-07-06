"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
    >
      <LogOut size={16} /> Sign out
    </button>
  );
}
