import mongoose from "mongoose";

const likedSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  musicianId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Musician",
    required: true,
  },
  musicId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Musics",
    required: true,
  },
}
,{
    collection: "Liked",
    timestamps: true,
    versionKey: false,
  });

export default mongoose.model("Liked", likedSchema);
