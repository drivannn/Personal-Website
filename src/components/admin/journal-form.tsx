"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { uploadPublicAsset } from "@/lib/supabase/storage";
import { JournalEntry, journalCategories } from "@/lib/types";
import { slugify } from "@/lib/utils";

const urlField = z.string().url("Use a valid URL.").or(z.literal("")).optional();

const schema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().optional(),
  category: z.enum(journalCategories),
  excerpt: z.string().min(10, "Excerpt is too short."),
  content: z.string().min(20, "Content is too short."),
  cover_url: urlField,
  published_at: z.string().optional(),
  is_published: z.boolean().optional(),
});

type FormInput = z.infer<typeof schema>;

function defaultValues(entry?: JournalEntry): FormInput {
  return {
    title: entry?.title ?? "",
    slug: entry?.slug ?? "",
    category: entry?.category ?? "Development Log",
    excerpt: entry?.excerpt ?? "",
    content: entry?.content ?? "",
    cover_url: entry?.cover_url ?? "",
    published_at: entry?.published_at?.slice(0, 10) ?? "",
    is_published: entry?.is_published ?? false,
  };
}

export function JournalForm({
  entry,
  onSaved,
  onCancel,
}: {
  entry?: JournalEntry;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(entry),
  });

  async function onSubmit(values: FormInput) {
    setMessage(null);

    try {
      const supabase = createClient();
      const coverUrl = coverFile
        ? await uploadPublicAsset(coverFile, "journal/covers")
        : values.cover_url || null;

      const payload = {
        slug: values.slug?.trim() || slugify(values.title),
        title: values.title,
        category: values.category,
        excerpt: values.excerpt,
        content: values.content,
        cover_url: coverUrl,
        published_at: values.published_at || null,
        is_published: Boolean(values.is_published),
      };

      const result = entry?.id
        ? await supabase.from("journal_entries").update(payload).eq("id", entry.id)
        : await supabase.from("journal_entries").insert(payload);

      if (result.error) throw result.error;

      onSaved();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save journal entry.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-md border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg border border-white/10 bg-zinc-950 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Journal title" error={errors.title?.message}>
          <input className={inputClass} {...register("title")} />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <input className={inputClass} placeholder="auto-generated if empty" {...register("slug")} />
        </Field>
        <Field label="Category" error={errors.category?.message}>
          <select className={inputClass} {...register("category")}>
            {journalCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </Field>
        <Field label="Publish date" error={errors.published_at?.message}>
          <input className={inputClass} type="date" {...register("published_at")} />
        </Field>
      </div>

      <Field label="Excerpt" error={errors.excerpt?.message}>
        <textarea className={inputClass} rows={3} {...register("excerpt")} />
      </Field>
      <Field label="Content" error={errors.content?.message}>
        <textarea className={inputClass} rows={8} {...register("content")} />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Cover image upload">
          <input
            className={inputClass}
            type="file"
            accept="image/*"
            onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)}
          />
        </Field>
        <Field label="Cover URL" error={errors.cover_url?.message}>
          <input className={inputClass} {...register("cover_url")} />
        </Field>
      </div>

      <label className="flex items-center gap-3 text-sm text-zinc-300">
        <input type="checkbox" className="h-4 w-4 accent-red-500" {...register("is_published")} />
        Published
      </label>

      {message ? <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-200">{message}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
          {entry ? "Save changes" : "Add journal entry"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/10"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm text-zinc-300">
      {label}
      {children}
      {error ? <span className="mt-2 block text-red-300">{error}</span> : null}
    </label>
  );
}
