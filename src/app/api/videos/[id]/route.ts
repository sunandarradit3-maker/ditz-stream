import { getVideo, likeVideo, listComments, listRelatedVideos } from "@/lib/store";

export const runtime = "nodejs";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  const video = await getVideo(id);
  if (!video) {
    return Response.json({ error: "Video tidak ditemukan" }, { status: 404 });
  }
  const [comments, related] = await Promise.all([listComments(id), listRelatedVideos(id, video.category)]);
  return Response.json({ video, comments, related });
}

export async function PATCH(_: Request, { params }: Params) {
  const { id } = params;
  const updated = await likeVideo(id);
  if (!updated) {
    return Response.json({ error: "Video tidak ditemukan" }, { status: 404 });
  }
  return Response.json({ video: updated });
}
