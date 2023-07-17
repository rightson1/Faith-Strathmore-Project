"use client";
import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileLinks } from "@/constants";
import { useAuth } from "@/utils/AuthContext";
import { navLinksTypes } from "@/types";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hover:bg-background  p-5 fb-sm-h"
      >
        <Image
          width={20}
          height={20}
          className=""
          src="/menu.svg"
          alt="Hussle Yangu Logo"
        />
      </button>
      <Transition
        show={open}
        enter="transition-opacity duration-300  bg-white  "
        enterFrom="opacity-0 w-0 h-0  hidden bg-white"
        enterTo="opacity-100  cover-fx fixed w-screen h-screen  bg-[rgba(0,0,0,.1)]  "
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100 cover-fx "
        leaveTo="opacity-0 w-0 h-0 hidden "
        onClick={() => setOpen(false)}
      >
        <div className="menu  relative" onClick={(e) => e.stopPropagation()}>
          <button
            className="absolute top-5 right-5 focus:outline-none hover:bg-transparent cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <AiOutlineCloseCircle className="w-10 h-10 " />
          </button>
          {mobileLinks
            .filter(
              (item: navLinksTypes) => item.admin === user?.admin || !item.admin
            )
            .map(({ link, title }, index) => (
              <Link
                key={index}
                href={link}
                className={`link font-quest m-link my-1 ${
                  link === pathname && "m-link-active"
                }`}
              >
                {title}
              </Link>
            ))}
          {user ? (
            <Link
              href="/profile"
              className={`link font-quest m-link my-1 ${
                "/profile" === pathname && "m-link-active"
              }`}
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className={`link font-quest m-link my-1 ${
                "/login" === pathname && "m-link-active"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </Transition>
    </>
  );
};

export default MobileMenu;
