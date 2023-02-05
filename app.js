const path = require("path");
const crypto = require("crypto");

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const galleryRouter = require("./routes/gallery");
const bannerRouter = require("./routes/banner");
const bannerMobileRouter = require("./routes/bannerMobile");
const { ObjectId } = require("mongodb");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "galleryImage");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString() + "_" + file.originalname,
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const url = process.env.MONGODB_API;
const url =
  "mongodb+srv://gallery:gallery123@cluster0.huslkba.mongodb.net/gallery?retryWrites=true&w=majority";

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride("_method"));

const conn = mongoose.createConnection(url);

async function run() {
  await conn;
}

run().catch((err) => console.log(err));

let gfs;
let gridfsBucket;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

app.use(
  "/galleryImage",
  express.static(path.join(__dirname, "galleryImage")),
);

app.use("/gallery", galleryRouter);
app.use("/banner", bannerRouter);
app.use("/banner-mobile", bannerMobileRouter);
app.post(
  "/image",
  upload.single("galleryImage"),
  async (req, res) => {
    try {
      res.send({ message: "suceess" });
    } catch (err) {
      res.send({ message: "Failed" });
    }
  },
);
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist",
      });
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      return res.json(files);
    }
  });
});

app.get("/file/:filename", (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      return res.json(file);
    },
  );
});

app.get("/image-id/:id", (req, res) => {
  gfs.files.findOne(
    { _id: ObjectId(req.params.id) },
    (err, file) => {
      console.log(file);
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }

      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        console.log(file.filename);
        const readstream =
          gridfsBucket.openDownloadStreamByName(
            file.filename,
          );
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "not an image",
        });
      }
    },
  );
});

app.get("/image/:filename", (req, res) => {
  console.log(gfs.files);
  gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      console.log(file);
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }

      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        console.log(file.filename);
        const readstream =
          gridfsBucket.openDownloadStreamByName(
            file.filename,
          );
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "not an image",
        });
      }
    },
  );
});

const port = process.env.PORT || 5001;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("ashsjkh"));

app.listen(port, () => {
  console.log("Server is on the port ", port);
});
