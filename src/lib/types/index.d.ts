import { socket_events } from '@/lib/types/enumerations';

export interface I_UserSchema {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  picture: string;
  bio: string;
  created_at: string; // Timestamp in ISO 8601 format
  updated_at: string; // Timestamp in ISO 8601 format
  last_active_at: string; // Timestamp in ISO 8601 format
}

type T_FriendRequestData = {
  id: string;
  first_name: string;
  last_name: string;
  picture: string;
  username: string;
  request_date: string;
  request_type: 'sent' | 'received';
};

export interface I_Message {
  id: string;
  edited: boolean;
  content: string;
  sender_id: string;
  created_at: string;
  updated_at: string;
  recipient_id: string;
  friendship_id: string;
  images?: string[];
  files?: string[];
  message_status: 'seen' | 'sent' | 'pending';
  type: socket_events;
}

export type I_MessageRequest = {
  date?: string;
  sender: string;
  content: string;
  recipient: string;
  images?: string[];
  files?: string[];
  type: socket_events;
};

export type T_MessageResponse = {
  type: string;
  date: string;
  sender: string;
  content: string;
  recipient: string;
  messageId: string;
  friendship: string;
  images?: string[];
  files?: string[];
};

export interface I_Friendship {
  id: string;
  created_at: string;
  sender_id: string;
  recipient_id: string;
  friendship_status: 'accepted' | 'pending';
}

export interface T_VideoCallInviteResponse {
  type: string;
  room_id: string;
  sender_id: string;
  recipient_id: string;
  date: string;
}

export interface I_Notifications {
  id: string;
  type: 'all' | 'seen' | 'unseen';
  seen: boolean;
  content: string;
  sender_id: string;
  created_at: string;
  recipient_id: string;
}

export interface I_PopulatedNotification {
  id: string;
  type: string;
  boolean: string;
  content: string;
  sender_id: string;
  created_at: string;
  recipient_id: string;
  picture: string;
  first_name: string;
  last_name: string;
}

export interface T_Comment {
  id: string;
  content: string;
  created_at: string;
  publication_id: string;
  user_id: string;
}

export interface T_PopulatedComment {
  id: string;
  content: string;
  created_at: string;
  publication_id: string;
  user_id: string;
  username: string;
  picture: string;
  liked_by_user: boolean;
  first_name: string;
  last_name: string;
}

export enum E_PublicationStatus {
  Draft = 'draft',
  Published = 'published',
}

export interface I_Publication {
  id: string;
  created_at: string;
  updated_at: string;
  publication_status: E_PublicationStatus;
  images: string[];
  description: string;
  publisher_id: string;
  likes_count: number;
  comments_count: number;
  publisher: string;
}

export interface I_Recommendation {
  id: string;
  created_at: string;
  updated_at: string;
  publication_status: E_PublicationStatus;
  images: string[];
  description: string;
  publisher_id: string;
  likes_count: number;
  comments_count: number;
  publisher: string;
  username: string;
  picture: string;
  liked_by_user: boolean;
  first_name: string;
  last_name: string;
}

type E_StoryVisibility = 'public' | 'private' | 'archive';

interface I_Story {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string; // Timestamp with time zone
  visibility: E_StoryVisibility;
}

export type T_FeedStory = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  user_picture: string;
  image_url: string;
};

export type T_StoryFull = {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string; // Timestamp with time zone
  visibility: E_StoryVisibility;
  user_picture: string;
  user_username: string;
};

export interface I_Short {
  id: string;
  user_id: string;
  video_url: string;
  description: string;
  created_at: string; // Timestamp in ISO
}

export interface I_ShortPopulated {
  id: string;
  user_id: string;
  user_picture: string;
  username: string;
  first_name: string;
  last_name: string;
  video_url: string;
  description: string;
  created_at: string;
}
