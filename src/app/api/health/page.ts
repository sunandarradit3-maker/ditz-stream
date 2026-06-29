import { getStats } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const stats = await getStats();
  return Response.json({ ok: true, stats });
}
