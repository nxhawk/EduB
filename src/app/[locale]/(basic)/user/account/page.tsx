import Container from "@mui/material/Container";
import React from "react";
import { type Metadata } from "next";
import SideBar from "@/ui/user/side-bar";
import AccountSetting from "@/ui/user/right-side/account-setting";
import LeftSideBar from "@/ui/user/left-side-bar";

export const metadata: Metadata = {
  title: "EduB - User - Choose your course, master your future",
  description: "Choose your course, master your future",
  icons: "/logo.png",
};

const Page = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ bgcolor: "background.main", color: "primary.main" }}
      className="flex gap-2 relative w-full p-0 overflow-x-hidden"
    >
      <SideBar LeftSide={<LeftSideBar />} RightSide={<AccountSetting />} />
    </Container>
  );
};

export default Page;
