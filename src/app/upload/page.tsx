"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    channel: "DiTz Studio",
    category: "Programming",
    duration: "12:00",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    avatar: "",
    description: "",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Menyimpan...");
    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setStatus("Gagal upload");
      return;
    }
    const json = await res.json();
    setStatus(`Video berhasil ditambahkan: ${json.video.title}`);
    setForm({
      title: "",
      channel: "DiTz Studio",
      category: "Programming",
      duration: "12:00",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      avatar: "",
      description: "",
      source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header onMenuToggle={() => setOpen((v) => !v)} search={search} setSearch={setSearch} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 px-4 py-6 lg:px-6">
          <section className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-fuchsia-500/20 p-3 text-fuchsia-300">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Upload Video</h1>
                <p className="text-sm text-zinc-400">Tambahkan video baru ke source code yang kamu jual.</p>
              </div>
            </div>

            <form onSubmit={submit} className="mt-6 grid gap-4">
              {[
                ["Title", "title"],
                ["Channel", "channel"],
                ["Category", "category"],
                ["Duration", "duration"],
                ["Thumbnail URL", "thumbnail"],
                ["Avatar URL", "avatar"],
                ["Source URL", "source"],
              ].map(([label, key]) => (
                <label key={key} className="grid gap-2">
                  <span className="text-sm text-zinc-300">{label}</span>
                  <input
                    value={(form as any)[key]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm outline-none placeholder:text-zinc-500"
                  />
                </label>
              ))}

              <label className="grid gap-2">
                <span className="text-sm text-zinc-300">Description</span>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm outline-none placeholder:text-zinc-500"
                />
              </label>

              <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950">
                Simpan video
              </button>

              {status ? <div className="text-sm text-zinc-300">{status}</div> : null}

              <Link href="/" className="text-sm text-fuchsia-300 hover:text-fuchsia-200">
                Kembali ke beranda
              </Link>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
