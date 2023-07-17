// Importing required modules and components
"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import MobileMenu from "./MobileMenu";
import useScreenWidth from "./useScreenWidth";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/constants";
import { mobileLinks } from "@/constants";
import { BiArrowBack } from "react-icons/bi";
import { useAuth } from "@/utils/AuthContext";
import { navLinksTypes } from "@/types";

const NavBar = () => {
  // Custom hooks and utility functions
  const { scrolled } = useScreenWidth(); // Hook to determine if the user has scrolled down the page
  const { user, logout } = useAuth(); // Custom hook for handling user authentication and logout
  const pathname = usePathname(); // Hook to get the current pathname of the page
  const router = useRouter(); // Next.js router to handle client-side routing

  return (
    // Navigation bar header
    <header
      className={`w-screen pad-x fb nav-h z-10  fixed top-0 left-0 ${
        scrolled ? "nav-glass" : "bg-background"
      }`}
    >
      {/* Navigation menu */}
      <nav className="fb w-full z-[20]">
        {/* Logo or Back button */}
        {mobileLinks.find(({ link }) => link === pathname) ? (
          // If the current pathname matches any link in mobileLinks, show the logo with a link to the homepage
          <Link href="/" className="flex justify-start ">
            <Image
              width={100}
              height={100}
              className="logo"
              src="/logo.svg"
              alt="Univora Logo"
            />
          </Link>
        ) : (
          // If the current pathname does not match any link in mobileLinks, show a Back button that navigates back to the previous page
          <button
            onClick={() => router.back()}
            className="flex flex-row items-center justify-start gap-[10px] text-button-3 "
          >
            <BiArrowBack className="w-6 h-6" />
            <span>Back</span>
          </button>
        )}

        {/* Navigation links */}
        <div className=" gap-4 fb-sm">
          <Link href={"/"} className="link text-hover hover:no-underline">
            Home
          </Link>
          <Link href={"/search"} className="link text-hover hover:no-underline">
            Search
          </Link>
          {user?.admin && (
            <Link
              href={"/new-listings"}
              className="link text-hover hover:no-underline"
            >
              New Listing
            </Link>
          )}
          {user?.admin && (
            <Link
              href={"/admin"}
              className="link text-hover hover:no-underline"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Additional buttons for larger screens */}
        <div className="hidden md:fb gap-3  fb-sm">
          <Link href="/contact">
            {/* Show a "Contact Us" button that links to the "/search" page */}
            <Button title="Contact Us" containerStyles="outlined"></Button>
          </Link>

          {/* Conditionally show "Profile" or "Login" button based on user authentication */}
          {user ? (
            <Link href="/profile">
              <Button title="Profile" containerStyles="filled"></Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button title="Login" containerStyles="filled"></Button>
            </Link>
          )}
        </div>

        {/* Mobile menu component */}
        <MobileMenu />
      </nav>
    </header>
  );
};

export default NavBar;
