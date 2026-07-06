"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { uploadPublicAsset } from "@/lib/supabase/storage";
import { portfolioCategories, PortfolioItem } from "@/lib/types";
import { slugify } from "@/lib/utils";

const urlField = z.string().url("Use a valid URL.").or(z.literal("")).optional();

const schema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().optional(),
  category: z.enum(portfolioCategories),
  role: z.string().min(2, "Role is required."),
  short_description: z.string().min(10, "Short description is too short."),
  description: z.string().min(20, "Full description is too short."),
  tools: z.string().min(2, "Add at least one tool."),
  project_date: z.string().optional(),
  thumbnail_url: urlField,
  cover_url: urlField,
  gallery_urls: z.string().optional(),
  video_url: urlField,
  document_url: urlField,
  writing_content: z.string().optional(),
  github_url: urlField,
  youtube_url: urlField,
  google_drive_url: urlField,
  live_website_url: urlField,
  other_url: urlField,
});

type FormInput = z.infer<typeof schema>;

function defaultValues(item?: PortfolioItem): FormInput {
  return {
    title: item?.title ?? "",
    slug: item?.slug ?? "",
    category: item?.category ?? "Web Development",
    role: item?.role ?? "",
    short_description: item?.short_description ?? "",
    description: item?.description ?? "",
    tools: item?.tools.join(", ") ?? "",
    project_date: item?.project_date ?? "",
    thumbnail_url: item?.thumbnail_url ?? "",
    cover_url: item?.cover_url ?? "",
    gallery_urls: item?.gallery_urls.join("\n") ?? "",
    video_url: item?.video_url ?? "",
    document_url: item?.document_url ?? "",
    writing_content: item?.writing_content ?? "",
    github_url: item?.external_links.github ?? "",
    youtube_url: item?.external_links.youtube ?? "",
    google_drive_url: item?.external_links.googleDrive ?? "",
    live_website_url: item?.external_links.liveWebsite ?? "",
    other_url: item?.external_links.other ?? "",
  };
}

export function PortfolioForm({
  item,
  onSaved,
  onCancel,
}: {
  item?: PortfolioItem;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(item),
  });

  async function onSubmit(values: FormInput) {
    setMessage(null);

    try {
      const supabase = createClient();
      const thumbnailUrl = thumbnailFile
        ? await uploadPublicAsset(thumbnailFile, "portfolio/thumbnails")
        : values.thumbnail_url || null;
      const uploadedGallery = galleryFiles
        ? await Promise.all(Array.from(galleryFiles).map((file) => uploadPublicAsset(file, "portfolio/gallery")))
        : [];
      const existingGallery = values.gallery_urls
        ? values.gallery_urls.split("\n").map((url) => url.trim()).filter(Boolean)
        : [];

      const payload = {
        slug: values.slug?.trim() || slugify(values.title),
        title: values.title,
        category: values.category,
        role: values.role,
        short_description: values.short_description,
        description: values.description,
        tools: values.tools.split(",").map((tool) => tool.trim()).filter(Boolean),
        project_date: values.project_date || null,
        thumbnail_url: thumbnailUrl,
        cover_url: values.cover_url || thumbnailUrl,
        gallery_urls: [...existingGallery, ...uploadedGallery],
        video_url: values.video_url || null,
        document_url: values.document_url || null,
        writing_content: values.writing_content || null,
        external_links: {
          github: values.github_url || undefined,
          youtube: values.youtube_url || undefined,
          googleDrive: values.google_drive_url || undefined,
          liveWebsite: values.live_website_url || undefined,
          other: values.other_url || undefined,
        },
      };

      const result = item?.id
        ? await supabase.from("portfolio_items").update(payload).eq("id", item.id)
        : await supabase.from("portfolio_items").insert(payload);

      if (result.error) throw result.error;

      onSaved();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save project.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-md border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg border border-white/10 bg-zinc-950 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Project title" error={errors.title?.message}>
          <input className={inputClass} {...register("title")} />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <input className={inputClass} placeholder="auto-generated if empty" {...register("slug")} />
        </Field>
        <Field label="Category" error={errors.category?.message}>
          <select className={inputClass} {...register("category")}>
            {portfolioCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </Field>
        <Field label="Role" error={errors.role?.message}>
          <input className={inputClass} {...register("role")} />
        </Field>
        <Field label="Project date" error={errors.project_date?.message}>
          <input className={inputClass} type="date" {...register("project_date")} />
        </Field>
        <Field label="Tools used" error={errors.tools?.message}>
          <input className={inputClass} placeholder="Next.js, Figma, Premiere Pro" {...register("tools")} />
        </Field>
      </div>

      <Field label="Short description" error={errors.short_description?.message}>
        <textarea className={inputClass} rows={3} {...register("short_description")} />
      </Field>
      <Field label="Full description" error={errors.description?.message}>
        <textarea className={inputClass} rows={6} {...register("description")} />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Thumbnail image upload">
          <input
            className={inputClass}
            type="file"
            accept="image/*"
            onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)}
          />
        </Field>
        <Field label="Thumbnail URL" error={errors.thumbnail_url?.message}>
          <input className={inputClass} {...register("thumbnail_url")} />
        </Field>
        <Field label="Gallery images upload">
          <input
            className={inputClass}
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => setGalleryFiles(event.target.files)}
          />
        </Field>
        <Field label="Gallery URLs" error={errors.gallery_urls?.message}>
          <textarea className={inputClass} rows={3} placeholder="One URL per line" {...register("gallery_urls")} />
        </Field>
        <Field label="Video link" error={errors.video_url?.message}>
          <input className={inputClass} {...register("video_url")} />
        </Field>
        <Field label="Document link" error={errors.document_url?.message}>
          <input className={inputClass} {...register("document_url")} />
        </Field>
      </div>

      <Field label="Writing content" error={errors.writing_content?.message}>
        <textarea className={inputClass} rows={5} {...register("writing_content")} />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="GitHub link" error={errors.github_url?.message}>
          <input className={inputClass} {...register("github_url")} />
        </Field>
        <Field label="YouTube link" error={errors.youtube_url?.message}>
          <input className={inputClass} {...register("youtube_url")} />
        </Field>
        <Field label="Google Drive link" error={errors.google_drive_url?.message}>
          <input className={inputClass} {...register("google_drive_url")} />
        </Field>
        <Field label="Live website link" error={errors.live_website_url?.message}>
          <input className={inputClass} {...register("live_website_url")} />
        </Field>
      </div>

      {message ? <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-200">{message}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
          {item ? "Save changes" : "Add project"}
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
