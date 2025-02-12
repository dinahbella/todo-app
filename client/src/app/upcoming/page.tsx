import { AppSidebar } from "@/components/Sidebar";
import React from "react";

const Upcoming = () => {
  return (
    <div className="flex h-screen">
      <AppSidebar />

      <main className="flex-1 pl-14 m-5 space-y-4"></main>
    </div>
  );
};

export default Upcoming;
