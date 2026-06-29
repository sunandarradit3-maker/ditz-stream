import Link from "next/link";
import type { Video } from "@/lib/types";
import { Eye } from "lucide-react";

type Props = { video: Video; compact?: boolean };

const formatViews = (views: number) => new Intl.NumberFormat("id-ID").format(views);

export function VideoCard({ video, compact = false }: Props) {
  if (compact) {
    return (
      <Link href={`/watch/${video.id}`} className="group grid grid-cols-[160px_1fr] gap-3 overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold">{video.duration}</div>
        </div>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5">{video.title}</h3>
          <p className="mt-1 text-xs text-zinc-400">{video.channel}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
            <Eye className="h-3.5 w-3.5" />
            {formatViews(video.views)} views
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/watch/${video.id}`} className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/5 transition hover:bg-white/10">
      <div className="relative aspect-video overflow-hidden">
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2 py-1 text-xs font-semibold">{video.duration}</div>
      </div>
      <div className="flex gap-3 p-4">
        <img src={video.avatar} alt={video.channel} className="h-11 w-11 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-semibold leading-6">{video.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{video.channel}</p>
          <p className="text-xs text-zinc-500">{formatViews(video.views)} views · {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(video.createdAt))}</p>
        </div>
      </div>
    </Link>
  );
}
