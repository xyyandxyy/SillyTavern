import { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { getCharacterAvatarUrl } from "@/lib/st-api";
import type { STCharacter, STChatMessage } from "@/types";

interface ChatViewProps {
  character: STCharacter | null;
  messages: STChatMessage[];
  serverUrl: string;
  onSendMessage: (text: string) => void;
}

export function ChatView({
  character,
  messages,
  serverUrl,
  onSendMessage,
}: ChatViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const avatarUrl =
    character?.avatar
      ? getCharacterAvatarUrl(serverUrl, character.avatar)
      : undefined;

  if (!character) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-raised border border-border">
          <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Select a Character
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Choose a character from the sidebar to start a conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-3">
        <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-border">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={character.name}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-raised">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {character.name}
          </h3>
          {character.personality && (
            <p className="text-xs text-muted-foreground truncate max-w-xs">
              {character.personality}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-3xl space-y-6 p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm text-muted-foreground">
                Start your conversation with {character.name}
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <ChatMessage
                key={`${msg.send_date}-${i}`}
                message={msg}
                characterAvatar={!msg.is_user ? avatarUrl : undefined}
              />
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSend={onSendMessage} />
    </div>
  );
}
