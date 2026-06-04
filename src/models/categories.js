import { Schema, model } from "mongoose";

const categoriesShema = new Schema({});

export const CategoriesModel = model("region", categoriesShema);
