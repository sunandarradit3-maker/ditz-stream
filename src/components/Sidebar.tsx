"use client";

import Link from "next/link";
import { Clock3, Flame, Home, ListVideo, PlaySquare, Settings, Upload } from "lucide-react";

const sidebarItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/?tab=trending", icon: Flame, label: "Trending" },
  { href: "/?tab=subscriptions", icon: PlaySquare, label: "Subscriptions" },
  { href: "/?tab=history", icon: Clock3, label: "History" },
  { href: "/?tab=playlists", icon: ListVideo, label: "Playlists" },
  { href: "/upload", icon: Upload, label: "Upload" },
  { href: "/studio", icon: Settings, label: "Settings" },
];

type Props = { open: boolean; onClose: () => void; };

export function Sidebar({ open, onClose }: Props) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-zinc-950 px-4 pt-20 transition-transform duration-300 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between lg:hidden">
          <div className="text-sm font-medium text-zinc-300">Menu</div>
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✕</button>
        </div>

        <div className="mt-6 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 font-semibold">DS</div>
            <div>
              <div className="font-semibold">Creator Studio</div>
              <div className="text-xs text-zinc-400">Kelola channel, upload, dan analytics</div>
            </div>
          </div>
          <Link href="/studio" className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950">
            Buka Studio <span>›</span>
          </Link>
        </div>
      </aside>

      {open ? <button aria-label="Close sidebar overlay" onClick={onClose} className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" /> : null}
    </>
  );
}
