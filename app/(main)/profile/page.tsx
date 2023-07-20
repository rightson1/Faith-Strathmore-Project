"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, fetchUser, logout } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [admin, setAdmin] = useState("false");

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
      setPhone(user.phone || "");
      setAdmin((user.admin == true ? "true" : "false") || "false");
    }
  }, [user]);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const update = async () => {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          name: name,
          email: email,
          phone: phone,
          admin: admin == "true" ? true : false,
        }).then(() => {
          fetchUser(user.uid);
        });
      };
      toast.promise(update(), {
        loading: "Updating...",
        success: "Updated",
        error: "Error Updating",
      });
    }
  };

  const handleLogout = async () => {
    const loggin = async () => {
      await logout();
      router.push("/login");
    };
    toast.promise(loggin(), {
      loading: "Logging Out...",
      success: "Logged Out",
      error: "Error Logging Out",
    });
  };

  if (!user) return <h1 className="text-center">Loading....</h1>;
  return (
    <section className="mt-10 pad-x">
      <h2 className="h2-size  indigo">{user.displayName.toUpperCase()}</h2>

      <form onSubmit={submit} className="cols-2 gap-20 md:gap-10  mt-5 ">
        <div>
          <div className="flex-col-start gap-5">
            <h2 className="p-size text-indigo-500"></h2>
          </div>
          <div className="cols-2  w-full mt-5 ">
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="name">Name</label>
              <input
                placeholder={user?.displayName}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="w-full p-2 border-2 border-black-400"
              />
            </div>

            <div className="flex-col-start gap-2 w-full col-span-2 md:col-span-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full p-2 border-2 border-black-400"
              />
            </div>
            <div className="flex-col-start gap-2 w-full  col-span-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                id="phone"
                className="p-2 border-2 border-black-400 w-full"
              />
            </div>
            <div className="flex-col-start gap-2 col-span-2 ">
              <label htmlFor="admin">Is Admin</label>
              <select
                name="admin"
                id="admin"
                className="w-full p-2 border-2 border-black-400 form-select "
                onChange={(e) => {
                  setAdmin(e.target.value);
                }}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            {/* <div className="flex-col-start gap-2 w-full col-span-2">

                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Leave a description"
                                className="w-full p-2 border-2 border-black-400 "
                            ></textarea>
                        </div> */}
          </div>
        </div>
        <div className="flex-col-start gap-5 border-gray-300 p-4 border-[1px] md:mr-5  rounded-md">
          <div className="flex-col-start gap-2 w-full">
            <h2 className="p-size text-indigo-500 font-bold">User Card</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500 font-semibold">Name</h2>
            <h2 className="p-size text-indigo-500 font-semibold">Value</h2>
          </div>
          <hr className="h-[1px] bg-gray-300 w-full" />
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">Name</h2>
            <h2 className="p-size text-indigo-500">{user.displayName}</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">Email</h2>
            <h2 className="p-size text-indigo-500">{user.email}</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">Phone</h2>
            <h2 className="p-size text-indigo-500">{user.phone}</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500 font-bold">Status</h2>
            <label className="" htmlFor="name">
              Logged In
            </label>
          </div>
          <div className="w-full fb gap-5">
            <button
              className="w-full bg-indigo-500 text-white p-2 rounded-md"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="w-full bg-indigo-500 text-white p-2 rounded-md"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Profile;
