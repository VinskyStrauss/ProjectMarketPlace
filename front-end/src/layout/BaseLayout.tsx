import React from "react";
import { AppSidebar } from "./AppSidebar";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex w-screen h-screen page-bg text-black overflow-y-auto">
      <AppSidebar />

      <div className={`min-h-screen w-4/5`}>{children}</div>
    </div>
  );
};
