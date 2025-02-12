import { Settings, LogOut } from "lucide-react";
import React from "react";
import { SidebarFooter } from "./ui/sidebar";

const Footer = () => {
  return (
    <div>
      {/* Sidebar Footer */}
      <SidebarFooter>
        <div className="flex items-center space-x-2 p-2 m-1 w-full mt-8 rounded-md hover:bg-gray-200">
          <Settings />
          <h5 className="hover:font-medium">Settings</h5>
        </div>
        <div className="flex items-center space-x-2 p-2 m-1 w-full rounded-md hover:bg-gray-200">
          <LogOut />
          <p className="hover:font-medium">Log Out</p>
        </div>
      </SidebarFooter>
    </div>
  );
};

export default Footer;
