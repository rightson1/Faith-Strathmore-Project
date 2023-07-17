"use client";
import React, { useEffect } from "react";
import { categories, priceQualifier, sub_type, types } from "@/constants";
const NewItem = () => {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="pt-10 pad-x">
      <h2 className="h3 ">New Training Data</h2>
      <div className="mt-5 ">
        <form onSubmit={submit}>
          <div className="cols-2  w-full mt-5 ">
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="state">State</label>
              <input
                name="state"
                id="state"
                placeholder="State"
                className="w-full p-2 border-2 border-black-400 form-input"
              />
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="locality">Locality</label>
              <input
                name="locality"
                placeholder="Locality"
                id="locality"
                className="w-full p-2 border-2 border-black-400 form-input"
              />
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="priceQualifier">Price Qualifier</label>
              <select
                name="priceQualifier"
                id="priceQualifier"
                className="w-full p-2 border-2 border-black-400 form-select "
              >
                {priceQualifier.map((item) => (
                  <option value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {categories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                id="type"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {types.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="sub_type">Sub Type</label>
              <select
                name="type"
                id="type"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {sub_type.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="bedRooms">Bed Rooms</label>
              <select
                name="bedRooms"
                id="bedRooms"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="toilets">Toilets</label>
              <select
                name="toilets"
                id="toilets"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="toilets">Toilets</label>
              <select
                name="toilets"
                id="toilets"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="furnished">Furnished</label>
              <select
                name="furnished"
                id="furnished"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="serviced">Serviced</label>
              <select
                name="serviced"
                id="serviced"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="shared">Shared</label>
              <select
                name="shared"
                id="shared"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="parking">Parking</label>
              <select
                name="parking"
                id="parking"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="w-full flex gap-5 col-span-2">
              <button
                className="w-full bg-indigo-500 text-white p-2 rounded-md"
                type="reset"
              >
                Clear
              </button>
              <button
                className="w-full bg-indigo-500 text-white p-2 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewItem;
