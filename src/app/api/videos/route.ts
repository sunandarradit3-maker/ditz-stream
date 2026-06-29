import { createVideo, listVideos } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;
  const videos = await listVideos({ q, category });
  return Response.json({ videos });
}

export async function POST(request: Request) {
  const body = await request.json();
  const video = await createVideo(body);
  return Response.json({ video }, { status: 201 });
}
