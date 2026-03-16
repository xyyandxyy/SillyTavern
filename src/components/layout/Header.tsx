import {
  Server,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  connected: boolean;
  serverUrl: string;
  onDisconnect: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({
  connected,
  serverUrl,
  onDisconnect,
  sidebarOpen,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8"
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
            <Server className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground hidden sm:inline">
            SillyTavern
          </span>
        </div>
      </div>

      {connected && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              connected ? "bg-status-online" : "bg-status-offline"
            )} />
            <span className="text-xs text-muted-foreground hidden md:inline">
              {serverUrl}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDisconnect}
            className="text-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Disconnect</span>
          </Button>
        </div>
      )}
    </header>
  );
}
