import Navbar from "@components/Navbar";
import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromptForge",
  description: "Discover & Share AI Prompt",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
