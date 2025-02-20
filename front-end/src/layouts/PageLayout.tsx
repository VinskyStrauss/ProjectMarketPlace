import React from "react";

export type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen?: boolean;
};

export const PageLayout = ({ children, ...divProps }: PageProps) => {
  return (
    <div
      className={`flex flex-col gap-5 h-full w-full overflow-y-auto ${"pl-4 pr-4 pt-[1.5rem] pb-4"}`}
      {...divProps}
    >
      {children}
    </div>
  );
};
