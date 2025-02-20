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
        ${selected ? "bg-gray-200" : ""}`}
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
      className="flex flex-row h-screen sidebar-bg px-2 pt-[2rem] w-full justify-between"
    >
      <div className="py-4">
        <div className="flex px-3 gap-6 justify-between items-center text-black">
          <img src="/assets/shop-cart.svg" alt="logo" className="h-8" />
          <Link to="/" className="font-mono text-xl">
            Project MarketPlace
          </Link>
        </div>
      </div>
      <div className="h-full px-3 hover:overflow-y-auto overflow-hidden">
        <ul className="flex flex-row my-3 gap-2 font-regular">
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
