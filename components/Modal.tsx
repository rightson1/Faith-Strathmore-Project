import { useState } from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { DialogProps, productCardProps } from "@/types";
import { AiOutlineSearch } from "react-icons/ai";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { products } from "@/constants";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
export default function Modal({ open, setOpen, children }: DialogProps) {
  const [query, setQuery] = useState<string>("");
  const filteredProjects = query
    ? products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed  inset-0 z-10 overflow-y-auto  pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black-500 opacity-30" />
          {children}
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
