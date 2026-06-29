"use client";

import { useState } from "react";

type Props = { videoId: string; onCreated: () => void };

export function CommentForm({ videoId, onCreated }: Props) {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!body.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, author: author || "You", body }),
      });
      if (!res.ok) throw new Error("Gagal mengirim komentar");
      setBody("");
      setAuthor("");
      onCreated();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 grid gap-3 rounded-[24px] border border-white/10 bg-zinc-950/70 p-4">
      <div className="grid gap-3 md:grid-cols-[180px_1fr]">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-zinc-500" />
        <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Tulis komentar..." className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-zinc-500" onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
      </div>
      <button disabled={busy} onClick={submit} className="ml-auto rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 disabled:opacity-60">
        {busy ? "Mengirim..." : "Kirim komentar"}
      </button>
    </div>
  );
}
