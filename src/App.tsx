import { useState } from "react";
import { ConnectionForm } from "@/components/connection/ConnectionForm";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatView } from "@/components/chat/ChatView";
import { useSTConnection } from "@/hooks/useSTConnection";
import { cn } from "@/lib/utils";

export default function App() {
  const {
    connection,
    characters,
    selectedCharacter,
    messages,
    connect,
    disconnect,
    selectCharacter,
    sendMessage,
  } = useSTConnection();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isConnected = connection.status === "connected";

  if (!isConnected) {
    return <ConnectionForm connection={connection} onConnect={connect} />;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        connected={isConnected}
        serverUrl={connection.serverUrl}
        onDisconnect={disconnect}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - responsive */}
        <div
          className={cn(
            "absolute inset-y-14 left-0 z-30 lg:relative lg:inset-auto transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <Sidebar
            characters={characters}
            serverUrl={connection.serverUrl}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={(char) => {
              selectCharacter(char);
              setSidebarOpen(false);
            }}
            onDisconnect={disconnect}
          />
        </div>

        {/* Backdrop on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-background/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat area */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <ChatView
            character={selectedCharacter}
            messages={messages}
            serverUrl={connection.serverUrl}
            onSendMessage={sendMessage}
          />
        </main>
      </div>
    </div>
  );
}
