import mongoose from "mongoose";

const musicsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    musicianId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Musician",
    },
    duration: {
      type: String,
      required: true,
    },
    fileUrl: String,
  },
  {
    timestamps: true,
    collection: "Musics",
    versionKey: false,
  }
);

export default mongoose.model("Musics", musicsSchema);
