"use client";
import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  query,
  doc,
  getDocs,
  collection,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
const Register = () => {
  const router = useRouter();

  const { handleSignIn } = useAuth();
  async function userExists(email: string) {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0;
  }

  async function createUser(uid: string, email: string, displayName: string) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      uid: uid,
      email: email,
      displayName: displayName,
      photoURL: "",
    });
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Holla");
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;
    const name: string = e.currentTarget.fullname.value;

    async function addUser() {
      const exist = await userExists(email);
      if (exist) {
        throw new Error("User already exists");
      } else {
        await createUserWithEmailAndPassword(auth, email, password).then(
          async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            const displayName = name;
            await createUser(uid, email, displayName).then((res) => {
              router.push("/login");
              return;
            });
          }
        );
      }
    }
    toast.promise(
      addUser().catch((e) => {
        console.log(e);
        throw new Error(e);
      }),
      {
        loading: "Creating account...",
        success: "Account created successfully",
        error: "Account already exists",
      }
    );
  };

  return (
    <section className="grid grid-cols-3 h-[120vh]">
      <div className="col-span-3 sm:col-span-1 relative w-full h-full px-4">
        <Image
          src="/logo.svg"
          width={500}
          height={500}
          alt="Logo"
          className="absolute left-5 right-5 h-[50px] w-[50px]"
        />
        <form className="fx-col-center w-full h-full " onSubmit={submit}>
          <div className="w-full max-w-[500px] fx-col-center gap-5 px-4">
            <div className="fx-col-center">
              <h6 className="h6">Welcome Back</h6>
              <p className=" text-center font-thin text-[15px]">
                Continue with google or enter your email and password
              </p>
            </div>
            <button
              className="fc justify-around gap-5 border-darkBlue border-[1.5px] p-2 rounded-md w-full"
              type="button"
              onClick={() => handleSignIn()}
            >
              <FcGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </button>
            <div className="fc gap-2 my-2 w-full ">
              <div className="w-full h-[1px] bg-darkBlue"></div>
              <span className="">or</span>
              <div className="w-full h-[1px] bg-darkBlue"></div>
            </div>
            <input
              type="name"
              name="fullname"
              id="name"
              placeholder="Name"
              className=" border-b-[1px] border-darkBlue  p-2 w-full  outline-none"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className=" border-b-[1px] border-darkBlue  p-2 w-full  outline-none"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className=" border-b-[1px] border-darkBlue  p-2 w-full  outline-none"
            />

            <button
              className="bg-darkBlue text-white rounded-md p-2 w-full"
              type="submit"
            >
              Register
            </button>

            <div className="fc gap-2">
              <span className="text-[15px]">Don't have an account?</span>
              <Link href="/login" className="text-darkBlue">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="col-span-2 mb-hidden relative">
        <Image
          src="/login.jpg"
          alt="Picture of the author"
          width={1000}
          height={1000}
          className="object-cover rounded-tl-[50px] rounded-bl-[50px] z-[2]"
        />
        <div className="h-center z-[4] fc gap-4">
          <Image
            src="/logo.svg"
            width={500}
            height={500}
            alt="Logo"
            className="h-[50px] w-[50px]"
          />
          <h6 className="h6 text-grayish">FAITH</h6>
        </div>
      </div>
    </section>
  );
};

export default Register;
