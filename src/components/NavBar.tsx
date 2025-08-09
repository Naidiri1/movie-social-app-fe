"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../app/hooks";
import type { NavbarProps } from "@material-tailwind/react";
import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { EyeIcon, BookmarkIcon, Trophy } from "lucide-react";
import { IoHome } from "react-icons/io5";
import { IoArrowUndoSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { Orbitron } from "next/font/google";
import PhoneNavlist from "./phoneNavlist";
import { logout } from "../redux/reducers/authSlice";
import { restoreUserSession } from "../redux/reducers/authSlice";
import { AppDispatch } from "../redux/store";
import { CgSandClock } from "react-icons/cg";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const NavbarComponent = () => {
  const router = useRouter();
  const { username } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openNav, setOpenNav] = React.useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (pathname !== "/searchMovie" && pathname !== "/movieDetails") {
      setSearchQuery("");
    }
  }, [pathname]);
    const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if ((!token && !username === null) || username === undefined) {
      dispatch(restoreUserSession());
      if (!username) {
        router.push("/login");
      }
    }
  }, [username,pathname, token]);

  console.log(username);
  const handleLogout = async () => {
    const channel = new BroadcastChannel("auth_channel");
    const token = sessionStorage.getItem("access_token");
    if (token) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logoutUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    dispatch(logout());
    channel.postMessage({ type: "logout" });
    router.push("/login");
    channel.close();
  };

  useEffect(() => {
    const channel = new BroadcastChannel("auth_channel");
    const handleLogoutMessage = (event: any) => {
      if (event.data.type === "logout") {
        sessionStorage.removeItem("access_token");
        router.push("/login");
      }
    };
    channel.onmessage = handleLogoutMessage;
    return () => {
      channel.close();
    };
  }, [router]);

  const handleSearch = () => {
    if (searchQuery === "" || searchQuery === undefined) {
      return;
    }
    router.push(`/searchMovie?query=${searchQuery}`);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2  flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-white"
      >
        <Link href="/popular">
          <button
            className={`flex items-center ml-2 text-white rounded-full px-4 py-2 ${
              pathname === "/popular" ? "bg-black" : ""
            }`}
          >
            Popular
            <IoHome className="h-4 w-4 ml-1 text-white" />
          </button>
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-white"
      >
        <Link href="/upcoming">
          <button
            className={`flex items-center ml-2 text-white rounded-full px-4 py-2 ${
              pathname === "/upcoming" ? "bg-black" : ""
            }`}
          >
            Upcoming
            <IoArrowUndoSharp className="h-5 w-5 ml-1 text-white" />
          </button>
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-white"
      >
        <Link href="/favorites">
          <button
            className={`flex items-center ml-2 text-white rounded-full px-4 py-2 ${
              pathname === "/favorites" ? "bg-black" : ""
            }`}
          >
            Favorites
            <BookmarkIcon className="h-5 w-5 ml-1 text-white" />
          </button>
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-white"
      >
        <Link href="/watched">
          <button
            className={`flex items-center ml-2 text-white rounded-full px-4 py-2 ${
              pathname === "/watched" ? "bg-black" : ""
            }`}
          >
            Watched
            <EyeIcon className="h-5 w-5 ml-1 text-white" />
          </button>
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-white"
      >
        <Link href="/top10">
          <button
            className={`flex items-center ml-2 text-white rounded-full px-4 py-2 ${
              pathname === "/top10" ? "bg-black" : ""
            }`}
          >
            Top 10
            <Trophy className="h-5 w-5 ml-1 text-white" />
          </button>
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-white"
      >
        <Link href="/watch-later">
          <button
            className={`flex items-center ml-2 text-white rounded-full px-4 py-2 ${
              pathname === "/watch-later" ? "bg-black" : ""
            }`}
          >
            Watch Later
            <CgSandClock className="h-5 w-5 ml-1 text-white" />
          </button>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="w-full max-w-none border border-none rounded-none bg-black px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex flex-wrap items-center justify-between">
        <Typography
          as="a"
          href="/popular"
          className={`mr-4 ml-2 cursor-pointer py-1.5  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-500 tracking-widest text-[14px] ${orbitron.className}`}
        >
          {username
            ? `Welcome ${username} to Social Movie`
            : "Welcome to Social Movie"}
        </Typography>
        <div className="hidden items-center gap-x-2 lg:flex">
          <div className="relative flex w-full gap-2 md:w-max">
            <div className="w-full max-w-sm min-w-[200px]">
              <div className="relative w-full text-white md:w-80">
                <Input
                  type="search"
                  label="Search Movie"
                  color="blue-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="text-white"
                />
                <button
                  onClick={handleSearch}
                  className="absolute top-1 right-1 flex items-center rounded bg-gray-800 py-1 pt-2 px-3 text-sm text-white hover:bg-gray-700 transition-all"
                  type="button"
                  placeholder="Search Movie..."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            size="sm"
            className="flex text-white ml-[12rem] cursor-pointer bg-red-300 hover:underline"
          >
            Logout
          </Button>
        </div>
        <hr className="mb-3 bg-red-200 m-2 hidden w-full border-t-2 border-red-500 lg:block" />
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-white" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" strokeWidth={2} />
          )}
        </IconButton>
        <div className="hidden lg:block w-full bg-red-900 px-4 py-2">
          <div className="hidden lg:block flex flex-row justify-center">
            {navList}
          </div>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <div>
            <div className="flex flex-col ">
              <PhoneNavlist />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <div className="relative  mb-5 w-full text-white md:w-80">
                <Input
                  type="search"
                  label="Search Movie"
                  color="blue-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="text-white border border-blue-gray-200"
                />
                <button
                  onClick={handleSearch}
                  className="absolute top-1 right-1 flex items-center rounded bg-gray-800 py-1 pt-2 px-3 text-sm text-white hover:bg-gray-700 transition-all"
                  type="button"
                  placeholder="Search Movie..."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>
            <Button
              size="sm"
              onClick={handleLogout}
              className="flex text-white mb-3 ml-5  cursor-pointer bg-red-300 hover:underline"
            >
              Logout
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
