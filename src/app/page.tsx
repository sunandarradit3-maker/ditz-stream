"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { VideoCard } from "@/components/VideoCard";
import { StatsCard } from "@/components/StatsCard";
import type { Video } from "@/lib/types";
import { PlayCircle, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";

const categories = ["All", "Programming", "Music", "Gaming", "Vlog", "Tech", "Motivation"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState<Video[]>([]);
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<{ videos: number; comments: number; views: number; likes: number; subscribers: number } | null>(null);

  useEffect(() => {
    async function load() {
      const [videosRes, healthRes] = await Promise.all([fetch("/api/videos"), fetch("/api/health")]);
      const videosJson = await videosRes.json();
      const healthJson = await healthRes.json();
      setVideos(videosJson.videos ?? []);
      setStats(healthJson.stats ?? null);
    }
    load();
  }, []);

  const visibleVideos = useMemo(() => {
    return videos.filter((video) => {
      const q = search.trim().toLowerCase();
      const matchQuery = !q || [video.title, video.channel, video.category, video.description].join(" ").toLowerCase().includes(q);
      const matchCategory = activeCategory === "All" || video.category === activeCategory;
      return matchQuery && matchCategory;
    });
  }, [videos, search, activeCategory]);

  const trending = visibleVideos.slice(0, 5);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header onMenuToggle={() => setOpen((v) => !v)} search={search} setSearch={setSearch} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="min-w-0 flex-1 px-4 py-6 lg:px-6">
          <section className="rounded-[28px] border border-white/10 bg-hero-gradient p-6 shadow-soft">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Full stack video platform
                </div>
                <h1 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-balance md:text-5xl">
                  DiTz stream — website mirip YouTube, modern, cepat, dan siap dijual.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
                  Ada feed video, watch page, komentar, upload video, creator studio, dan API backend yang bisa kamu sambungkan ke database sungguhan.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <Link href="/upload" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-zinc-950">
                    <UploadCloud className="h-4 w-4" />
                    Upload video
                  </Link>
                  <Link href="/studio" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-semibold text-zinc-200 hover:bg-white/10">
                    <PlayCircle className="h-4 w-4" />
                    Buka studio
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <StatsCard label="Total video" value={stats?.videos ?? videos.length} hint="Konten yang tersedia" />
                <StatsCard label="Views" value={stats ? new Intl.NumberFormat("id-ID").format(stats.views) : "-"} hint="Akumulasi tayangan" />
                <StatsCard label="Subscribers" value={stats ? new Intl.NumberFormat("id-ID").format(stats.subscribers) : "-"} hint="Estimasi channel" />
              </div>
            </div>
          </section>

          <section className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-white text-zinc-950"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </section>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section>
              <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {visibleVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>

            <aside className="space-y-5">
              <section className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Trending</h2>
                  <span className="text-xs text-zinc-500">Top 5</span>
                </div>
                <div className="mt-4 space-y-3">
                  {trending.map((video) => (
                    <VideoCard key={video.id} video={video} compact />
                  ))}
                </div>
              </section>

              <section className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-fuchsia-500/20 p-3 text-fuchsia-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Siap dijual</h3>
                    <p className="text-sm text-zinc-400">Source code tersusun rapi dan mudah diubah branding-nya.</p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
