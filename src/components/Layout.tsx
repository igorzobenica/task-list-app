import React from "react";
import { Toaster } from "./ui";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className="flex flex-col h-screen overflow-y-auto">
        <header className="bg-primary text-white p-4 shadow-md">
          <h1 className="text-2xl font-semibold">Task List App</h1>
        </header>
        <main className="py-12 mx-auto max-w-md">{children}</main>
        <Toaster />
      </div>
  );
};

export default Layout;
