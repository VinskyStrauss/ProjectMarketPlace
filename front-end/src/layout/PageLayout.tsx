import React from "react";

export type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen?: boolean;
};

export const PageLayout = ({ children, ...divProps }: PageProps) => {
  return (
    <div
      className={`flex flex-col h-full overflow-y-auto ${"pl-4 pr-4 pt-[5rem] pb-4"}`}
      {...divProps}
    >
      {children}
    </div>
  );
};
