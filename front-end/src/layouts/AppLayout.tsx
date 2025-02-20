import React from "react";
import { BaseLayout, BaseLayoutProps } from "./BaseLayout";
import { NavItem } from "./Nav";

export type AppLayoutProps = Partial<BaseLayoutProps>;

const HeaderMenu = () => {
  return <NavItem></NavItem>;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <BaseLayout headerRightMenu={<HeaderMenu />}>{children}</BaseLayout>;
};
