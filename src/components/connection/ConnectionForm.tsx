import { useState } from "react";
import { Server, Loader2, AlertCircle, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ConnectionState } from "@/types";

interface ConnectionFormProps {
  connection: ConnectionState;
  onConnect: (url: string) => void;
}

export function ConnectionForm({ connection, onConnect }: ConnectionFormProps) {
  const [url, setUrl] = useState(connection.serverUrl || "http://localhost:8000");
  const isConnecting = connection.status === "connecting";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onConnect(url.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        {/* Logo/Title */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-primary-glow">
            <Server className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            SillyTavern
          </h1>
          <p className="text-muted-foreground text-base">
            Connect to your SillyTavern server to start chatting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="server-url"
              className="text-sm font-medium text-foreground"
            >
              Server URL
            </label>
            <Input
              id="server-url"
              type="url"
              placeholder="http://localhost:8000"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isConnecting}
            />
          </div>

          {connection.error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{connection.error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isConnecting || !url.trim()}
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </form>

        {/* Help text */}
        <p className="text-center text-xs text-muted-foreground">
          Make sure your SillyTavern server is running with CORS enabled
          and CSRF disabled (--disableCsrf flag).
        </p>
      </div>
    </div>
  );
}
