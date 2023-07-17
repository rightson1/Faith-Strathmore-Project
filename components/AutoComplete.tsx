"use client";
import { Combobox } from "@headlessui/react";
import { AutoCompleteProps, AutoCompleteSearchProps } from "@/types";
import { AiOutlineSearch } from "react-icons/ai";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { use, useEffect } from "react";
import Modal from "@/components/Modal";
import Image from "next/image";
import axios from "axios";
import { url } from "@/constants";
import { useSearchCompleted } from "@/utils/hooks/useItems";

export const AutoComplete = ({
  open,
  setOpen,
  query,
  setQuery,
  filtered,
}: AutoCompleteProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
  };

  return (
    <div className="pad-x  flex-col gap-4 flex">
      <Modal open={open} setOpen={setOpen}>
        <Combobox
          as="div"
          className="relative  max-w-xl mx-5 sm:mx-auto  rounded-xl product-card shadow-2xl    divide-y"
          onChange={(e) => console.log(e)}
        >
          <div className="fc px-4 gap-3">
            <AiOutlineSearch className="h-6 w-6 text-gray-500" />
            <Combobox.Input
              onChange={(e) => setQuery(e.target.value)}
              className="w-full  bg-transparent border-0 text-sm h-12  focus:ring-0 outline-none text-gray-800 placeholder:text-gray-400  "
              placeholder="Search..."
            />
          </div>
          {filtered.length > 0 && (
            <Combobox.Options className="py-4 text-sm max-h-80 overflow-y-auto">
              {filtered.map((item, index: number) => {
                return (
                  <Combobox.Option
                    onClick={() => {
                      setQuery(item.name);
                      setOpen(false);
                    }}
                    key={index}
                    value={item.name}
                    // className="flex gap-4 items-center"
                  >
                    {({ active }) => (
                      <div
                        className={`space-x-1 flex items-center px-4 fb py-2 ${
                          active ? "bg-gray-200 rounded-xl" : ""
                        }`}
                      >
                        <div className="fc gap-2">
                          {" "}
                          <Image
                            width={50}
                            height={50}
                            src={item.productImage}
                            alt={item.name}
                            className="w-[30px] h-[30px] object-cover rounded-full"
                          />
                          <div className="flex flex-col gap-1">
                            <h6 className="p-size text-gray-800">
                              {item.name}
                            </h6>
                          </div>
                        </div>
                        <ArrowRightIcon className="h-8 -rotate-45 w-5 text-gray-500 " />
                      </div>
                    )}
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          )}
        </Combobox>
      </Modal>
    </div>
  );
};
export const SearchAutoComplete = ({
  open,
  setOpen,
  query,
  setQuery,
  filtered,
  setProducts,
  isLoading,
  setLoading,
}: AutoCompleteSearchProps) => {
  const [search, setSearch] = React.useState<string>("shoes");
  const { data, isInitialLoading } = useSearchCompleted(search);
  //setLoading to initialloading

  useEffect(() => {
    setLoading(isInitialLoading);
  }, [isInitialLoading]);

  useEffect(() => {
    if (!data) return;
    setProducts(data);
  }, [data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(query);
      setOpen(true);
      setOpen(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <Combobox
        as="div"
        inputMode="search"
        className="relative  max-w-xl mx-5 sm:mx-auto  rounded-xl product-card shadow-2xl    divide-y"
        onChange={(e) => {
          console.log(e);

          setSearch(query);
        }}
      >
        <div className="fc px-4 gap-3">
          <AiOutlineSearch className="h-6 w-6 text-gray-500" />
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            className="w-full  bg-transparent border-0 text-sm h-12  focus:ring-0 outline-none text-gray-800 placeholder:text-gray-400  "
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyDown}
            placeholder="Search..."
            inputMode="search"
          />
        </div>

        {filtered.length > 0 ? (
          <>
            <span className="fc gap-2 py-2 text-[13px] indigo">
              Suggestions
            </span>
            <Combobox.Options className="py-4 text-sm max-h-80 overflow-y-auto">
              {filtered.map((item, index: number) => {
                return (
                  <Combobox.Option
                    onClick={() => {
                      setQuery(item.name);
                      setOpen(false);
                    }}
                    key={index}
                    value={item.name}
                    // className="flex gap-4 items-center"
                  >
                    {({ active }) =>
                      item.productImage ? (
                        <div
                          className={`space-x-1 flex items-center px-4 fb py-2 ${
                            active ? "bg-gray-200 rounded-xl" : ""
                          }`}
                        >
                          <div className="fc gap-2">
                            {" "}
                            <div className="flex flex-col gap-1">
                              <h6 className="p-size text-gray-800">
                                {item.name}
                              </h6>
                            </div>
                            <ArrowRightIcon className="h-8 -rotate-45 w-5 text-gray-500 " />
                          </div>
                          <Image
                            width={50}
                            height={50}
                            src={item.productImage}
                            alt={item.name}
                            className="w-[30px] h-[30px] object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div
                          className={`space-x-1 flex items-center px-4  gap-2 py-2 cursor-pointer ${
                            active ? "bg-gray-200 rounded-xl" : ""
                          }`}
                        >
                          <h6 className="p-size text-gray-800">
                            View Items in{" "}
                            <span className="text-blue-900 italic underline">
                              {item.name}
                            </span>
                          </h6>
                          <ArrowRightIcon className="h-8 -rotate-45 w-5 text-gray-500 " />
                        </div>
                      )
                    }
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          </>
        ) : isLoading ? (
          <div className="w-full h-20">
            <div className="loading">
              <span className="loading__dot"></span>
              <span className="loading__dot"></span>
              <span className="loading__dot"></span>
            </div>
          </div>
        ) : null}
      </Combobox>
    </Modal>
  );
};
