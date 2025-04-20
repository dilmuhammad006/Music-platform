import multer from "multer";
import path from "path";
import { BaseException } from "../middlewares/base.exception.js";

const musicDir = path.join(process.cwd(),"..", "uploads", "music");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, musicDir);
  },
  filename: function (req, file, cb) {
    const uniquePath = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniquePath + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new BaseException("Only audio files are allowed", 409), false);
  }
};

export const uploadMusic = multer({ storage, fileFilter });
