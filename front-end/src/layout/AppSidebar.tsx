import React, { ReactNode } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  selected: boolean;
}

const SidebarItem = ({
  children,
  onClick,
  icon,
  selected,
}: SidebarItemProps) => {
  return (
    <li>
      <button
        type="button"
        className={`flex gap-2 w-full items-center p-2 text-black rounded-lg group
        ${selected ? "bg-white" : "hover:bg-gray-300"}`}
        onClick={onClick}
      >
        {icon}
        <span className="flex-1 text-start overflow-hidden whitespace-nowrap overflow-ellipsis text-xl font-mono">
          {children}
        </span>
      </button>
    </li>
  );
};

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="flex flex-col h-screen sidebar-bg px-2 pt-[2rem] w-1/5 "
    >
      <div className="py-4">
        <div className="flex px-3 justify-between items-center text-black">
          <Link to="/" className="font-mono text-xl">
            <img src="/assets/shop-cart.svg" alt="logo" className="h-8" />
            Project MarketPlace
          </Link>
        </div>
      </div>
      <div className={"w-full mb-2 border-b border-gray-300"} />
      <div className="h-full px-3 hover:overflow-y-auto overflow-hidden">
        <p className="text-md font-mono font-bold text-white ">Navigation</p>
        <ul className="my-3 space-y-2 font-regular">
          <SidebarItem
            onClick={() => {
              navigate("/home");
            }}
            icon={<AiOutlineHome />}
            selected={location.pathname === "/home"}
          >
            Home
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              navigate("/profile");
            }}
            icon={<CgProfile />}
            selected={location.pathname === "/profile"}
          >
            Profile
          </SidebarItem>
        </ul>
      </div>
    </aside>
  );
};
