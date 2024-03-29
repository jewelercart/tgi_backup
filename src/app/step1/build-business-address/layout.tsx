import React from "react";
import { Metadata } from "next";
import { AddClientPanel } from "@/context/business-credit/panel/add.client.panel";
import { AccountBanner } from "@/components/business-account-elements/account.banner";
import { SignOut } from "@/components/form-controller/authentication/logout";
export const metadata: Metadata = {
  title: "Fundability Foundation",
  description: "Generated by create next app",
};

let activeState = "";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-[100%] bg-white">
        <AccountBanner />
      </div>
      <div className="grid grid-cols-7 justify-between ">
        <div className="flex col-start-1 col-span-1 w-full justify-start content-start bg-white sidebar-mobileview">
          <AddClientPanel activeState={activeState} />
        </div>
        <div className="flex col-start-2 col-span-7 justify-start mr-6 business-page-padding-sm">
          {children}
        </div>
      </div>
      <p className="flex w-full justify-center content-center items-center text-red-400 py-4 bg-white">
        @2024. Official TGIscalme.com Website
      </p>
      
    </>
  );
}
