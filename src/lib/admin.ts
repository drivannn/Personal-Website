import { createClient } from "@/lib/supabase/server";

export async function getCurrentAdmin() {
  const supabase = await createClient();

  if (!supabase) {
    return { supabase: null, user: null, isAdmin: false };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, isAdmin: false };
  }

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  return { supabase, user, isAdmin: !error && data?.role === "admin" };
}
