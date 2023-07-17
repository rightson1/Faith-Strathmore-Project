"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/utils/AuthContext";
import { auth } from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { handleSignIn } = useAuth();
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;
    async function login() {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          router.push("/");
          return;
        }
      );
    }
    toast.promise(
      login().catch((e) => {
        console.log(e);
        throw new Error(e);
      }),
      {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: "Error logging in",
      }
    );
  }
  function handleForgot() {
    if (email === "") {
      toast.error("Please enter your email then click forgot password");
      return;
    }
    async function forgot() {
      await sendPasswordResetEmail(auth, email).catch((e) => {
        console.log(e);
        throw new Error(e);
      });
    }
    toast.promise(forgot(), {
      loading: "Sending password reset email...",
      success: "Password reset email sent",
      error: "Error sending password reset email",
    });
  }

  return (
    <section className="grid grid-cols-3 h-screen">
      <div className="col-span-3 sm:col-span-1 relative w-full h-full px-4">
        <Image
          src="/logo.svg"
          width={500}
          height={500}
          alt="Logo"
          className="absolute left-5 right-5 h-[50px] w-[50px]"
        />
        <div className="fx-col-center w-full h-full ">
          <form
            className="max-w-[500px] fx-col-center gap-5 px-4"
            onSubmit={submit}
          >
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
              <span>Login in with Google</span>
            </button>
            <div className="fc gap-2 my-2 w-full ">
              <div className="w-full h-[1px] bg-darkBlue"></div>
              <span className="">or</span>
              <div className="w-full h-[1px] bg-darkBlue"></div>
            </div>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              Login
            </button>

            <div className="fc gap-2">
              <span className="text-[15px]">Don't have an account?</span>
              <Link href="/register" className="text-darkBlue">
                Sign up
              </Link>
            </div>
            {/* Forgot Password */}
            <div className="fc gap-2">
              <button
                type="button"
                onClick={handleForgot}
                className="text-darkBlue"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
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

export default Login;
