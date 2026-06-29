import { createComment, listComments } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");
  if (!videoId) {
    return Response.json({ error: "videoId wajib" }, { status: 400 });
  }
  const comments = await listComments(videoId);
  return Response.json({ comments });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.videoId || !body?.body) {
    return Response.json({ error: "videoId dan body wajib" }, { status: 400 });
  }
  const comment = await createComment(body);
  return Response.json({ comment }, { status: 201 });
}
