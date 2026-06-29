"use client";

import Link from "next/link";
import { Bell, Menu, Search, Upload, UserCircle2 } from "lucide-react";

type Props = {
  onMenuToggle?: () => void;
  search: string;
  setSearch: (value: string) => void;
};

export function Header({ onMenuToggle, search, setSearch }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-6">
        <button onClick={onMenuToggle} className="rounded-2xl border border-white/10 bg-white/5 p-2 text-zinc-200 hover:bg-white/10 lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 font-black text-white shadow-soft">
            D
          </div>
          <div>
            <div className="text-lg font-semibold leading-none">DiTz stream</div>
            <div className="text-xs text-zinc-400">Video platform modern</div>
          </div>
        </Link>

        <div className="mx-auto hidden w-full max-w-2xl items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari video, channel, atau kategori..."
            className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </div>

        <Link href="/upload" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 md:flex">
          <Upload className="h-4 w-4" />
          Upload
        </Link>

        <button className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10">
          <Bell className="h-5 w-5" />
        </button>
        <Link href="/studio" className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10">
          <UserCircle2 className="h-5 w-5" />
        </Link>
      </div>

      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        <div className="flex min-w-full items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari video..."
            className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>
    </header>
  );
}
