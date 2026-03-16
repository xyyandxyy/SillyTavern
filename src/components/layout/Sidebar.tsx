import { Search, Users } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterCard } from "@/components/characters/CharacterCard";
import type { STCharacter } from "@/types";

interface SidebarProps {
  characters: STCharacter[];
  serverUrl: string;
  selectedCharacter: STCharacter | null;
  onSelectCharacter: (char: STCharacter) => void;
  onDisconnect: () => void;
}

export function Sidebar({
  characters,
  serverUrl,
  selectedCharacter,
  onSelectCharacter,
}: SidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return characters;
    const q = search.toLowerCase();
    return characters.filter((c) => c.name.toLowerCase().includes(q));
  }, [characters, search]);

  return (
    <div className="flex h-full w-72 flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="shrink-0 border-b border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Characters
          </h2>
          <span className="ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            {characters.length}
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-xs"
          />
        </div>
      </div>

      {/* Character List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filtered.length > 0 ? (
            filtered.map((char) => (
              <CharacterCard
                key={char.avatar || char.name}
                character={char}
                serverUrl={serverUrl}
                isSelected={selectedCharacter?.name === char.name}
                onSelect={onSelectCharacter}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {search ? "No characters found" : "No characters loaded"}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
