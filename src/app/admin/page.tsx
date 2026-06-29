"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { ShieldCheck, Settings2, Users2 } from "lucide-react";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<{ videos: number; comments: number; views: number; likes: number; subscribers: number } | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((json) => setStats(json.stats));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header onMenuToggle={() => setOpen((v) => !v)} search={search} setSearch={setSearch} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 px-4 py-6 lg:px-6">
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-fuchsia-500/20 p-3 text-fuchsia-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-sm text-zinc-400">Area kontrol untuk statistik dan pengelolaan produk digital.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <StatsCard label="Videos" value={stats?.videos ?? "-"} />
              <StatsCard label="Comments" value={stats?.comments ?? "-"} />
              <StatsCard label="Total Views" value={stats ? new Intl.NumberFormat("id-ID").format(stats.views) : "-"} />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-zinc-950/70 p-5">
                <div className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-cyan-300" />
                  <h2 className="font-semibold">Akses tim</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Panel ini siap dijadikan dasar untuk role user, moderator, editor, dan owner.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-zinc-950/70 p-5">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-fuchsia-300" />
                  <h2 className="font-semibold">Kontrol sistem</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Bisa dikembangkan ke report system, moderation queue, analytics, dan approval upload.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/" className="text-sm text-fuchsia-300 hover:text-fuchsia-200">
                Kembali ke beranda
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
      }
