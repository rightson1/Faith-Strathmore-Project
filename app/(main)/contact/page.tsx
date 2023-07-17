"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Feedback = () => {
  const { user, fetchUser } = useAuth();
  const router = useRouter();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) {
      router.push("/login");
    }
    e.preventDefault();
    const data = {
      name: user?.displayName,
      email: user?.email,
      phone: user?.phone,
      description: e.currentTarget.description.value,
      read: false,
      date: new Date(),
    };
    const add = async () => {
      await addDoc(collection(db, "feedback"), data);
    };
    toast.promise(add(), {
      loading: "Sending...",
      success: "Sent",
      error: "Error Sending",
    });
    e.currentTarget.description.value = "";
  };
  if (!user) return <h1 className="text-center">Loading....</h1>;
  return (
    <section className="mt-10 pad-x">
      <h2 className="h5  text-center">FEEDBACK</h2>
      <form onSubmit={submit} className="w-full  mt-5 fc">
        <div className="w-full mt-5 fx-col-center gap-5 max-w-[600px]">
          <textarea
            name="description"
            id="description"
            placeholder="Leave a description"
            className="w-full p-2 border-2 border-black-400  h-[200px] "
          ></textarea>
          <button
            className="w-full bg-indigo-500 text-white p-2 rounded-md"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
};

export default Feedback;
