export interface RdvForm {
  nom: string;
  email: string;
  motif: string;
  date: string;
  msg: string;
}

export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Project {
  id: number;
  nom: string;
  desc: string;
  tech: string[];
  url: string | null;
  type: 'browser' | 'mobile';
  color: string;
  emoji?: string;
}

export interface Experience {
  poste: string;
  org: string;
  date: string;
  bullets: string[];
}

export interface SkillCategory {
  cat: string;
  items: string[];
  grow?: boolean;
}

export interface ContactInfo {
  ico: string;
  label: string;
  val: string;
  href?: string;
}
