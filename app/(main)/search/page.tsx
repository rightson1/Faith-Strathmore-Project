"use client";
import React, { useEffect } from "react";
import { categories, priceQualifier, sub_type, types } from "@/constants";
import axios from "axios";
import { Property } from "@/types";

const Search = () => {
  const [prediction, setPrediction] = React.useState<number>(0);
  const [houses, setHouses] = React.useState<Property[]>([]);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    payload.state = "Nairobi";
    payload.listmonth = "7.0";
    payload.listyear = "2021.0";
    payload.locality = "Kitengela";
    payload.category = "For_Rent";
    axios
      .post("http://127.0.0.1:5000/predict", payload)
      .then((res) => {
        const predictionValue: number = JSON.parse(res.data.prediction)[0];
        setPrediction(predictionValue);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/api/items?price=${prediction}`)
      .then((res) => {
        const data = res.data;
        setHouses(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="pt-10 pad-x">
      <h2 className="h3 ">Search</h2>
      <div className="cols-2 gap-20 md:gap-10  mt-5 ">
        <form onSubmit={submit}>
          <div className="flex-col-start gap-5">
            <h2 className="p-size text-indigo-500">Select the variables</h2>
          </div>
          <div className="cols-2  w-full mt-5 ">
            {/* <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
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
            </div> */}
            {/* <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                required
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {categories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div> */}
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                required
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
                id="type"
                name="sub_type"
                required
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
                required
                name="bedrooms"
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
                id="parking"
                className="w-full p-2 border-2 border-black-400 form-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="bathrooms">Bathrooms</label>
              <select
                name="bathrooms"
                required
                id="bathrooms"
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
            <div className="fb col-span-2  w-full">
              <h6 className="h6">Approximate Price</h6>
              <p className="p">{prediction}</p>
            </div>
          </div>
        </form>
        <div className="flex-col-start gap-5 mt-10 md:mt-0">
          <h2 className="p-size text-indigo-500">Results</h2>
          {/* Approximate Price */}

          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-size p-2">Id</th>
                  <th className="p-size p-2">Type</th>
                  <th className="p-size p-2">Sub Type</th>
                  <th className="p-size p-2">State</th>
                  <th className="p-size p-2">Locacity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {houses?.map((house) => (
                  <tr key={house.id} className="bg-white">
                    <td className="p-size p-2">{house.id}</td>
                    <td className="p-size p-2">{house.type}</td>
                    <td className="p-size p-2">{house.sub_type}</td>
                    <td className="p-size p-2">{house.state}</td>
                    <td className="p-size p-2">{house.locality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
