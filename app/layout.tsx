import "@styles/globals.css";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Promp Engineering Tool",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
