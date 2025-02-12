import { FastForward, ListCheck, Calendar, File } from "lucide-react";
import router from "next/router";
import React from "react";
import { SidebarMenu, SidebarMenuBadge } from "./ui/sidebar";

export const SideMenu = () => {
  return (
    <div>
      <SidebarMenu>
        <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
          <FastForward />
          <p className="hover:font-medium">Upcoming</p>
          <SidebarMenuBadge className="bg-gray-200 rounded hover:bg-white">
            12
          </SidebarMenuBadge>
        </div>
        <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
          <ListCheck />
          <p className="hover:font-medium">Today</p>
          <SidebarMenuBadge className="bg-gray-200 rounded hover:bg-white">
            5
          </SidebarMenuBadge>
        </div>
        <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
          <Calendar />
          <p className="hover:font-medium">Calender</p>
        </div>
        <div
          className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200"
          onClick={() => router.push("/sticky")}
        >
          <File />
          <p className="hover:font-medium">Sticky wall</p>
        </div>
      </SidebarMenu>
    </div>
  );
};
