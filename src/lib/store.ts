import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { seedStore } from "@/lib/mock";
import type { CreateCommentInput, CreateVideoInput, StoreData, Video } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "ditz-stream.json");

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureStoreFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedStore, null, 2), "utf-8");
  }
}

async function readStore(): Promise<StoreData> {
  await ensureStoreFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as StoreData;
}

async function writeStore(data: StoreData) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function mutate<T>(fn: (current: StoreData) => T | Promise<T>) {
  writeQueue = writeQueue.then(async () => {
    const current = await readStore();
    const result = await fn(current);
    return result;
  });
  return writeQueue as Promise<T>;
}

function normalizeQuery(v: string) {
  return v.trim().toLowerCase();
}

export async function listVideos(options?: { q?: string; category?: string }) {
  const current = await readStore();
  const q = normalizeQuery(options?.q ?? "");
  const category = normalizeQuery(options?.category ?? "all");
  return current.videos
    .filter((video) => {
      const matchQuery =
        !q ||
        [video.title, video.channel, video.category, video.description].join(" ").toLowerCase().includes(q);
      const matchCategory = category === "all" || video.category.toLowerCase() === category;
      return matchQuery && matchCategory;
    })
    .sort((a, b) => b.views - a.views || +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getVideo(id: string) {
  const current = await readStore();
  return current.videos.find((video) => video.id === id) ?? null;
}

export async function listRelatedVideos(id: string, category?: string) {
  const current = await readStore();
  return current.videos.filter((video) => video.id !== id && (!category || video.category === category)).slice(0, 8);
}

export async function listComments(videoId: string) {
  const current = await readStore();
  return current.comments
    .filter((comment) => comment.videoId === videoId)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function createComment(input: CreateCommentInput) {
  return mutate(async (current) => {
    const comment = {
      id: crypto.randomUUID(),
      videoId: input.videoId,
      author: input.author.trim() || "Anonymous",
      body: input.body.trim(),
      createdAt: new Date().toISOString(),
    };
    current.comments.unshift(comment);
    await writeStore(current);
    return comment;
  });
}

export async function createVideo(input: CreateVideoInput) {
  return mutate(async (current) => {
    const video: Video = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      channel: input.channel.trim(),
      category: input.category.trim() || "General",
      duration: input.duration?.trim() || "LIVE",
      thumbnail: input.thumbnail.trim(),
      avatar:
        input.avatar?.trim() ||
        `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(input.channel.trim() || "DiTz")}`,
      description: input.description.trim(),
      source: input.source.trim(),
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    current.videos.unshift(video);
    await writeStore(current);
    return video;
  });
}

export async function likeVideo(id: string) {
  return mutate(async (current) => {
    const video = current.videos.find((item) => item.id === id);
    if (!video) return null;
    video.likes += 1;
    await writeStore(current);
    return video;
  });
}

export async function getStats() {
  const current = await readStore();
  const views = current.videos.reduce((sum, v) => sum + v.views, 0);
  const likes = current.videos.reduce((sum, v) => sum + v.likes, 0);
  return {
    videos: current.videos.length,
    comments: current.comments.length,
    views,
    likes,
    subscribers: Math.max(12000, Math.floor(current.videos.length * 3100)),
  };
}
