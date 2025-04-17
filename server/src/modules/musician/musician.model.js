import mongoose from "mongoose";

const musicianSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    musicsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
    },
  },
  {
    collection: "Musician", 
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Musician", musicianSchema);
