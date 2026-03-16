export interface STCharacter {
  name: string;
  avatar: string;
  description: string;
  personality: string;
  first_mes: string;
  mes_example: string;
  scenario: string;
  creator_notes: string;
  tags: string[];
  create_date: string;
}

export interface STChatMessage {
  name: string;
  is_user: boolean;
  is_system: boolean;
  mes: string;
  send_date: string;
  extra?: {
    gen_id?: string;
    api?: string;
    model?: string;
  };
}

export interface STServerInfo {
  url: string;
  connected: boolean;
  version?: string;
}

export interface ConnectionState {
  status: "disconnected" | "connecting" | "connected" | "error";
  serverUrl: string;
  csrfToken: string | null;
  error: string | null;
}
