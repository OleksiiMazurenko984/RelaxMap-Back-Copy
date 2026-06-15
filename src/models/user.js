import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    avatarUrl: {
      type: String,
      default: "/public/images/default-avatar.jpg",
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre("save", async function () {
  if (!this.name) {
    this.name = this.email;
  }
});

export const User = model("User", userSchema);
