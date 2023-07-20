import { Button } from "@/components";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="pad-x">
      <section className="fb w-full  page-h">
        <div className="fx-cl-sc text-mb-center h-full  gap-4 ">
          <h1 className="h1">Predict the price of your dream house</h1>
          <p className="p">
            Approximate the probable price of your dream house using our
            prediction model.Register Now to get started for free.
          </p>
          <Link href="/search" className="w-full p-4 bg-grayish fb gap-2">
            <button className="p-2 p-blur w-full bg-white">
              <span className="text-blur">Search of Houses</span>
            </button>
            <Button title="Search" containerStyles="filled" />
          </Link>
        </div>
        <div className="w-full mb-hidden">
          <Image
            src="/header-picture.png"
            width={500}
            height={500}
            alt="Hero Section Page"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
