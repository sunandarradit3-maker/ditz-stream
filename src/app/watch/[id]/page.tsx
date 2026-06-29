"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { VideoCard } from "@/components/VideoCard";
import { CommentForm } from "@/components/CommentForm";
import type { Comment, Video } from "@/lib/types";
import { Heart, Share2, ThumbsUp } from "lucide-react";

export default function WatchPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [related, setRelated] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/videos/${params.id}`);
    if (!res.ok) {
      router.push("/");
      return;
    }
    const json = await res.json();
    setVideo(json.video);
    setComments(json.comments ?? []);
    setRelated(json.related ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [params.id]);

  if (loading || !video) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Header onMenuToggle={() => setOpen((v) => !v)} search={search} setSearch={setSearch} />
        <div className="mx-auto flex max-w-7xl">
          <Sidebar open={open} onClose={() => setOpen(false)} />
          <main className="flex-1 px-4 py-10 lg:px-6">Loading...</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header onMenuToggle={() => setOpen((v) => !v)} search={search} setSearch={setSearch} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="min-w-0 flex-1 px-4 py-6 lg:px-6">
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <section className="space-y-5">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                <video src={video.source} controls poster={video.thumbnail} className="aspect-video w-full bg-black" />
                <div className="p-5">
                  <h1 className="text-xl font-bold md:text-2xl">{video.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                    <span>{video.channel}</span>
                    <span>•</span>
                    <span>{new Intl.NumberFormat("id-ID").format(video.views)} views</span>
                    <span>•</span>
                    <span>{video.category}</span>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300">{video.description}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950">
                      <ThumbsUp className="h-4 w-4" />
                      Like
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10">
                      <Heart className="h-4 w-4" />
                      Subscribe
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              <section className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Komentar</h2>
                  <span className="text-xs text-zinc-500">{comments.length} komentar</span>
                </div>

                <CommentForm videoId={video.id} onCreated={load} />

                <div className="mt-4 space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                      <div className="text-sm font-semibold">{comment.author}</div>
                      <div className="mt-1 text-sm text-zinc-300">{comment.body}</div>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            <aside className="space-y-5">
              <section className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Related</h2>
                  <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300">Back to home</Link>
                </div>
                <div className="mt-4 space-y-3">
                  {related.map((item) => (
                    <VideoCard key={item.id} video={item} compact />
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
  
