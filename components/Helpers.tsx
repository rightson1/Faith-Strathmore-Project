"use client";
import { AutoCompleteProps, SearchProps, SlideShowProps } from "@/types";
import { BsSearch } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
export const stringReplacer = (reversedString: string) =>
  reversedString
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

export const stringSpaceRemover = (string: string) =>
  string.replace(/\s+/g, "-").toLowerCase();

export function Search({ setOpen, setQuery, query }: SearchProps) {
  return (
    <div className="fb w-full gap-2">
      <button
        className="fc  pl-4 product-card rounded-md py-2 w-full   h-[50px]"
        onClick={() => setOpen(true)}
      >
        <BsSearch className="text-2xl text-indigo-300" />
        <input
          className={`outline-none border-none bg-none w-full bg-transparent p-2`}
          value={query}
          placeholder="Click to search"
          disabled={true}
        />
        <span
          className="fc  px-4 rounded-md p-2  h-[50px] text-indigo-300 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setQuery("");
          }}
        >
          Clear
        </span>
      </button>
    </div>
  );
}

export const Slideshow = ({ images }: SlideShowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((src, index) => (
        <Transition
          key={index}
          show={index === currentIndex}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0">
            <Image
              src={src}
              className="h-full w-full object-cover"
              alt={`Image ${index + 1}`}
              fill={true}
            />
          </div>
        </Transition>
      ))}
    </div>
  );
};
