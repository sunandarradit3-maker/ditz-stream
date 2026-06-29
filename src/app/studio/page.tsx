"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import type { Video } from "@/lib/types";
import { BarChart3, Layers3, UploadCloud, Users } from "lucide-react";

export default function StudioPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<{ videos: number; comments: number; views: number; likes: number; subscribers: number } | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function load() {
      const [statsRes, videosRes] = await Promise.all([fetch("/api/health"), fetch("/api/videos")]);
      const statsJson = await statsRes.json();
      const videosJson = await videosRes.json();
      setStats(statsJson.stats);
      setVideos(videosJson.videos ?? []);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header onMenuToggle={() => setOpen((v) => !v)} search={search} setSearch={setSearch} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 px-4 py-6 lg:px-6">
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <h1 className="text-2xl font-bold">Creator Studio</h1>
            <p className="mt-2 text-sm text-zinc-400">Dashboard untuk pemilik channel dan penjual source code.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <StatsCard label="Total Video" value={stats?.videos ?? "-"} />
              <StatsCard label="Total Views" value={stats ? new Intl.NumberFormat("id-ID").format(stats.views) : "-"} />
              <StatsCard label="Total Likes" value={stats ? new Intl.NumberFormat("id-ID").format(stats.likes) : "-"} />
              <StatsCard label="Subscribers" value={stats ? new Intl.NumberFormat("id-ID").format(stats.subscribers) : "-"} />
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[24px] border border-white/10 bg-zinc-950/70 p-5">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-fuchsia-300" />
                  <h2 className="font-semibold">Performa Channel</h2>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-zinc-400">Avg. View Duration</div>
                    <div className="mt-2 text-2xl font-bold">6m 42s</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-zinc-400">CTR Thumbnail</div>
                    <div className="mt-2 text-2xl font-bold">9.8%</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-zinc-400">Retention</div>
                    <div className="mt-2 text-2xl font-bold">68%</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-zinc-950/70 p-5">
                <div className="flex items-center gap-2">
                  <Layers3 className="h-5 w-5 text-cyan-300" />
                  <h2 className="font-semibold">Konten terbaru</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {videos.slice(0, 5).map((video) => (
                    <Link key={video.id} href={`/watch/${video.id}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10">
                      <span className="line-clamp-1">{video.title}</span>
                      <span className="text-zinc-500">{video.duration}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/upload" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950">
                <UploadCloud className="h-4 w-4" />
                Upload baru
              </Link>
              <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10">
                <Users className="h-4 w-4" />
                Admin panel
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
