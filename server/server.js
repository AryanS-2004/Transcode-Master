const express = require("express");
const transcodeVideoQuality = require("./transcoder.js");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let format;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "input-videos/");
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        console.log(fileExtension);
        format = fileExtension;
        cb(null, "input" + fileExtension);
    },
});
const upload = multer({ storage });

app.post("/transcodeVideo", upload.single("video"), async (req, res) => {
    const quality = req.body.quality;
    console.log(typeof quality, quality);
    const inputFilePath = `./input-videos/input${format}`;
    const outputPaths = [
        { path: `./output-videos/output-240p.mp4`, resolution: "426x240" },
        { path: `./output-videos/output-360p.mp4`, resolution: "640x360" },
        { path: `./output-videos/output-480p.mp4`, resolution: "854x480" },
        { path: `./output-videos/output-720p.mp4`, resolution: "1280x720" },
        { path: `./output-videos/output-1080p.mp4`, resolution: "1920x1080" },
        { path: `./output-videos/output-1440p.mp4`, resolution: "2560x1440" },
        { path: `./output-videos/output-2160p.mp4`, resolution: "3840x2160" },
    ];

    for (const outputPathInfo of outputPaths) {
        await transcodeVideoQuality(
            inputFilePath,
            outputPathInfo.path,
            outputPathInfo.resolution
        );
    }
    res.send({ msg: "Conversions Done!" });
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
