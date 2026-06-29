import { getVideo, likeVideo, listComments, listRelatedVideos } from "@/lib/store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const video = await getVideo(id);
  if (!video) {
    return NextResponse.json({ error: "Video tidak ditemukan" }, { status: 404 });
  }
  const [comments, related] = await Promise.all([
    listComments(id),
    listRelatedVideos(id, video.category),
  ]);
  return NextResponse.json({ video, comments, related });
}

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updated = await likeVideo(id);
  if (!updated) {
    return NextResponse.json({ error: "Video tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ video: updated });
}
