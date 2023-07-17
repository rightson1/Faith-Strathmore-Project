import { Schema, model, models } from "mongoose";

const HouseSchema = new Schema(
  {
    id: { type: Number },
    price: { type: Number },
    priceQualifier: { type: String },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    toilets: { type: Number },
    furnished: { type: Number },
    serviced: { type: Number },
    shared: { type: Number },
    parking: { type: Number },
    category: { type: String },
    type: { type: String },
    sub_type: { type: String, required: false },
    state: { type: String },
    locality: { type: String },
    sub_locality: { type: String },
    listdate: { type: Date },
    image: { type: String }, // Assuming the image field is a URL or file path
    gallery: [{ type: String }], // Assuming the gallery field is an array of URLs or file paths
  },
  {
    timestamps: true,
  }
);

export default models.house || model("house", HouseSchema);
