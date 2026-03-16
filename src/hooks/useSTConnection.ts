import { useState, useCallback, useEffect } from "react";
import type { ConnectionState, STCharacter, STChatMessage } from "@/types";
import {
  connectToServer,
  fetchCharacters,
  getSavedServerUrl,
} from "@/lib/st-api";

export function useSTConnection() {
  const [connection, setConnection] = useState<ConnectionState>({
    status: "disconnected",
    serverUrl: getSavedServerUrl(),
    csrfToken: null,
    error: null,
  });
  const [characters, setCharacters] = useState<STCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<STCharacter | null>(null);
  const [messages, setMessages] = useState<STChatMessage[]>([]);

  const connect = useCallback(async (url: string) => {
    setConnection((prev) => ({ ...prev, status: "connecting", error: null }));
    const result = await connectToServer(url);
    setConnection(result);

    if (result.status === "connected" && result.csrfToken) {
      try {
        const chars = await fetchCharacters(
          result.serverUrl,
          result.csrfToken
        );
        setCharacters(chars);
      } catch {
        // Characters fetch failed but connection is still valid
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnection({
      status: "disconnected",
      serverUrl: connection.serverUrl,
      csrfToken: null,
      error: null,
    });
    setCharacters([]);
    setSelectedCharacter(null);
    setMessages([]);
  }, [connection.serverUrl]);

  const selectCharacter = useCallback(
    (char: STCharacter) => {
      setSelectedCharacter(char);
      // For demo, set first message from character's first_mes
      if (char.first_mes) {
        setMessages([
          {
            name: char.name,
            is_user: false,
            is_system: false,
            mes: char.first_mes,
            send_date: new Date().toISOString(),
          },
        ]);
      } else {
        setMessages([]);
      }
    },
    []
  );

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !selectedCharacter) return;
      const newMessage: STChatMessage = {
        name: "You",
        is_user: true,
        is_system: false,
        mes: text,
        send_date: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    [selectedCharacter]
  );

  // Auto-connect if URL is saved
  useEffect(() => {
    const savedUrl = getSavedServerUrl();
    if (savedUrl) {
      setConnection((prev) => ({ ...prev, serverUrl: savedUrl }));
    }
  }, []);

  return {
    connection,
    characters,
    selectedCharacter,
    messages,
    connect,
    disconnect,
    selectCharacter,
    sendMessage,
  };
}
