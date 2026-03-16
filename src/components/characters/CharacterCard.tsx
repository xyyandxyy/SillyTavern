import { cn } from "@/lib/utils";
import { getCharacterAvatarUrl } from "@/lib/st-api";
import { User } from "lucide-react";
import type { STCharacter } from "@/types";

interface CharacterCardProps {
  character: STCharacter;
  serverUrl: string;
  isSelected: boolean;
  onSelect: (char: STCharacter) => void;
}

export function CharacterCard({
  character,
  serverUrl,
  isSelected,
  onSelect,
}: CharacterCardProps) {
  const avatarUrl = character.avatar
    ? getCharacterAvatarUrl(serverUrl, character.avatar)
    : null;

  return (
    <button
      onClick={() => onSelect(character)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 border-l-[3px]",
        isSelected
          ? "bg-primary/15 border-l-primary"
          : "bg-transparent border-l-transparent hover:bg-surface-overlay hover:border-l-primary/50"
      )}
    >
      {/* Avatar */}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-border">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={character.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const fallback = (e.target as HTMLImageElement)
                .nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={cn(
            "absolute inset-0 items-center justify-center bg-surface-raised",
            avatarUrl ? "hidden" : "flex"
          )}
        >
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {character.name}
        </p>
        {character.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {character.description.substring(0, 80)}
          </p>
        )}
      </div>
    </button>
  );
}
