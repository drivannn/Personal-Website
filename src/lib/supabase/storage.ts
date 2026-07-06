import { createClient } from "@/lib/supabase/client";

export async function uploadPublicAsset(file: File, folder: string) {
  const supabase = createClient();
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("portfolio-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(path);
  return data.publicUrl;
}
