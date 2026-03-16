import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import type { STChatMessage } from "@/types";

interface ChatMessageProps {
  message: STChatMessage;
  characterAvatar?: string;
}

export function ChatMessage({ message, characterAvatar }: ChatMessageProps) {
  const isUser = message.is_user;

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-border">
        {!isUser && characterAvatar ? (
          <img
            src={characterAvatar}
            alt={message.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-raised">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("max-w-[680px] space-y-1", isUser ? "items-end" : "items-start")}>
        <p className={cn("text-xs font-medium", isUser ? "text-right text-primary" : "text-muted-foreground")}>
          {message.name}
        </p>
        <div
          className={cn(
            "rounded-bubble px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-br-sm bg-primary/20 text-primary-foreground"
              : "rounded-bl-sm border border-border bg-surface-raised text-foreground"
          )}
        >
          <p className="whitespace-pre-wrap">{message.mes}</p>
        </div>
      </div>
    </div>
  );
}
