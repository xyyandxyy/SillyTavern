import type { ConnectionState, STCharacter, STChatMessage } from "@/types";

const STORAGE_KEY = "st-server-url";

export function getSavedServerUrl(): string {
  return localStorage.getItem(STORAGE_KEY) || "";
}

export function saveServerUrl(url: string) {
  localStorage.setItem(STORAGE_KEY, url);
}

function trimUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export async function connectToServer(
  serverUrl: string
): Promise<ConnectionState> {
  const url = trimUrl(serverUrl);
  try {
    // Fetch CSRF token
    const csrfRes = await fetch(`${url}/csrf-token`, {
      credentials: "include",
    });
    if (!csrfRes.ok) throw new Error("Failed to get CSRF token");
    const csrfData = (await csrfRes.json()) as { token: string };

    // Fetch version to verify connection
    const versionRes = await fetch(`${url}/version`, {
      credentials: "include",
      headers: { "X-CSRF-Token": csrfData.token },
    });
    if (!versionRes.ok) throw new Error("Failed to get server version");

    saveServerUrl(url);

    return {
      status: "connected",
      serverUrl: url,
      csrfToken: csrfData.token,
      error: null,
    };
  } catch (err) {
    return {
      status: "error",
      serverUrl: url,
      csrfToken: null,
      error:
        err instanceof Error
          ? err.message
          : "Unable to connect to server",
    };
  }
}

export async function fetchCharacters(
  serverUrl: string,
  csrfToken: string
): Promise<STCharacter[]> {
  const res = await fetch(`${trimUrl(serverUrl)}/api/characters/all`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error("Failed to fetch characters");
  return (await res.json()) as STCharacter[];
}

export async function fetchChatHistory(
  serverUrl: string,
  csrfToken: string,
  characterName: string,
  fileName: string
): Promise<STChatMessage[]> {
  const res = await fetch(`${trimUrl(serverUrl)}/api/chats/get`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({
      ch_name: characterName,
      file_name: fileName,
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch chat history");
  return (await res.json()) as STChatMessage[];
}

export async function fetchCharacterChats(
  serverUrl: string,
  csrfToken: string,
  avatarUrl: string
): Promise<Array<{ file_name: string; file_size: number; mes: string }>> {
  const res = await fetch(
    `${trimUrl(serverUrl)}/api/characters/chats`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ avatar_url: avatarUrl }),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch character chats");
  return (await res.json()) as Array<{
    file_name: string;
    file_size: number;
    mes: string;
  }>;
}

export function getCharacterAvatarUrl(
  serverUrl: string,
  avatar: string
): string {
  return `${trimUrl(serverUrl)}/characters/${encodeURIComponent(avatar)}`;
}
