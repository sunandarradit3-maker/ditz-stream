export type Video = {
  id: string;
  title: string;
  channel: string;
  views: number;
  likes: number;
  category: string;
  duration: string;
  thumbnail: string;
  avatar: string;
  description: string;
  source: string;
  createdAt: string;
};

export type Comment = {
  id: string;
  videoId: string;
  author: string;
  body: string;
  createdAt: string;
};

export type StoreData = {
  videos: Video[];
  comments: Comment[];
};

export type CreateVideoInput = {
  title: string;
  channel: string;
  category: string;
  duration?: string;
  thumbnail: string;
  avatar?: string;
  description: string;
  source: string;
};

export type CreateCommentInput = {
  videoId: string;
  author: string;
  body: string;
};
