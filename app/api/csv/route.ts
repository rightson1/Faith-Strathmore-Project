// readCsvAndSaveToDb.js
import House from "@/models/House";
import db from "@/models/db";
import fs from "fs";
import { NextResponse } from "next/server";
async function cvsRead() {
  // const csvFilePath = "app\api\csv\data.csv";
  const csvFilePath = "constants/data.csv";
  const data = await fs.promises.readFile(csvFilePath, "utf-8");
  const lines = data.trim().split("\n").slice(1); // Remove header row and split into lines

  return lines.map((line) => {
    const [
      id,
      price,
      priceQualifier,
      bedrooms,
      bathrooms,
      toilets,
      furnished,
      serviced,
      shared,
      parking,
      category,
      type,
      sub_type,
      state,
      locality,
      sub_locality,
      listdate,
    ] = line.split(",");
    return {
      id: parseInt(id) || 0,
      price: parseFloat(price) || 0,
      priceQualifier,
      bedrooms: parseInt(bedrooms) || 0,
      bathrooms: parseInt(bathrooms) || 0,
      toilets: parseInt(toilets) || 0,
      furnished: parseInt(furnished) || 0,
      serviced: parseInt(serviced) || 0,
      shared: parseInt(shared) || 0,
      parking: parseInt(parking) || 0,
      category,
      type,
      sub_type,
      state,
      locality,
      sub_locality,
      listdate,
      image: images[Math.floor(Math.random() * images.length)],
      gallary: [
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
      ],
    };
  });
}

export async function GET() {
  try {
    const res = await cvsRead();
    await db();
    const houses = await House.insertMany(res.slice(0, 200));
    return NextResponse.json(houses);
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
const images = [
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/1.png?alt=media&token=c5703497-9f34-47fd-ae9e-cc1d44ef95fe",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/10.png?alt=media&token=c2577b77-4f5d-4005-98f4-6dee5b739618",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/11.png?alt=media&token=c3f43a0e-ff90-46db-b326-907faa335bcc",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/12.png?alt=media&token=6e0d7d8a-b096-4d11-bd0e-eba61875f2e6",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/13.png?alt=media&token=595f786c-d008-4b15-a3e8-81fa19a3c97a",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/14.png?alt=media&token=712f746b-93c8-40c3-936b-18dd8be7f2ba",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/15.png?alt=media&token=63c3d8ce-0e9d-4679-9d09-9cdd6f52b608",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/16.png?alt=media&token=3d6e4bc4-ae6c-4676-84e3-041f86ff33eb",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/17.png?alt=media&token=527cf867-da34-4681-a3cc-2ac21e19233d",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/18.png?alt=media&token=a02a41db-6574-43a1-8b20-c36f40127739",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/19.png?alt=media&token=bb5f4570-79de-4893-8f88-34045e0088e9",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/2.png?alt=media&token=bd797d05-1159-4427-96d0-0d781554a6ec",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/20.png?alt=media&token=1bd46a6f-2a85-4fd8-b039-6fe50c2a0bce",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/21.png?alt=media&token=4736f39a-e325-4fc1-b882-92fe8a731cf1",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/22.png?alt=media&token=d2468cc2-26c8-4edb-8679-87e6d2955cf2",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/23.png?alt=media&token=027e9a4b-4832-475d-9cb5-d5b7f2336c99",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/24.png?alt=media&token=8b4f27fd-20bc-4341-b7e9-4600731e1654",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/25.png?alt=media&token=d129b28d-bcd7-47e6-b996-525a9cd02c1c",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/26.png?alt=media&token=ff493524-f1c5-4926-9be5-0eb53b83cbe2",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/27.png?alt=media&token=26b39641-1934-4c24-aadf-4e871ac26e81",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/28.png?alt=media&token=fd89accb-b45a-46c4-9576-b77a4f5bde19",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/29.png?alt=media&token=44482af9-be76-4125-b6b1-dd4d2187146b",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/3.png?alt=media&token=fe256d7b-b073-42bb-baa0-e9efa24a9538",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/30.png?alt=media&token=a78d87b0-541a-448c-823c-e833792f99ff",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/31.png?alt=media&token=2bfa4f2c-e6a1-41a5-89c1-1ad595cd67b3",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/32.png?alt=media&token=1faa2bc4-c915-4c3e-8831-8acb35492f20",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/33.png?alt=media&token=38651287-a1e1-4930-946e-02ca2f9f484e",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/34.png?alt=media&token=27801fb4-41b4-455a-beb3-f9ad0765a686",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/35.png?alt=media&token=e09e8b13-a1e1-4ced-b57d-9710b31fb80c",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/36.png?alt=media&token=d697a0a2-cbf8-4e2f-8b46-b10614e9fc23",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/37.png?alt=media&token=1107cd06-5658-497c-b0d4-df01f2fb39e7",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/38.png?alt=media&token=392deeed-fe4f-4477-a477-0c3d66d6663c",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/39.png?alt=media&token=fa26af49-bc96-43e9-b8ba-da2e3c2c9006",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/4.png?alt=media&token=47f9f5f4-ed12-4283-95e0-9c8cd025a3d8",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/40.png?alt=media&token=35bde8bd-9b43-4235-a4bf-bcc7316f9cad",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/41.png?alt=media&token=186d3766-2e92-4651-a175-7f057bf72919",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/42.png?alt=media&token=dc8b5a8d-33c2-4579-ac8d-aabc4db10223",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/43.png?alt=media&token=747faef6-4435-4696-ab69-daac55f79ec6",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/44.png?alt=media&token=f7d3c972-efa3-4cf9-ae21-435ccb0d0e42",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/45.png?alt=media&token=a6095301-246c-4b9f-b67e-3218100e61e9",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/46.png?alt=media&token=d889b0fb-442e-4549-a869-6e6adf480907",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/47.png?alt=media&token=f3a78e58-bf60-46d1-8377-73c1144499cb",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/48.png?alt=media&token=899cb038-b9ec-4955-8266-02cdc40f04b6",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/49.png?alt=media&token=4ca45300-953e-46fd-862d-5616136e1ae7",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/5.png?alt=media&token=eac1a6e4-6fac-41eb-9602-2c8c204a401e",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/50.png?alt=media&token=49a82421-eca5-4dd9-84c1-fb8d45ec6688",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/51.png?alt=media&token=05088616-0bfc-48c8-884b-a3f51bfe8f5e",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/52.png?alt=media&token=acd874bd-3d75-4f8b-949b-2c15c06ceedc",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/6.png?alt=media&token=b841b731-65c2-4a9f-b109-b50c068a2437",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/7.png?alt=media&token=8f1d5e7c-29dc-40d1-81a2-89dd36c552bc",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/8.png?alt=media&token=c4b675b8-16ea-4451-9ce7-b7fca00f9f4c",
  "https://firebasestorage.googleapis.com/v0/b/faith-d3f59.appspot.com/o/9.png?alt=media&token=4d786874-634e-473f-97d9-7d4aa8eaa8c7",
];
