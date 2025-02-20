import React from "react";
import { AppSidebar } from "./AppSidebar";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex flex-col w-screen h-screen page-bg text-black overflow-y-auto">
      <AppSidebar />

      <div className={`min-h-screen w-full`}>{children}</div>
    </div>
  );
};
