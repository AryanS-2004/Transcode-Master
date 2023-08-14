const express = require("express");
const transcodeVideoQuality = require("./transcoder.js");
const generateSingedUploadUrl = require('./s3')
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let format;

app.post("/transcodeVideo",  async (req, res) => {
    console.log(req.body);
    const s3Url = req.body.s3Url;
    const inputFilePath = `./input-videos/input.${req.body.fileType}`;
    await downloadFile(s3Url, inputFilePath);
    const outputPaths = [
        { path: `./output-videos/output-240p.mp4`, resolution: "426x240" },
        { path: `./output-videos/output-360p.mp4`, resolution: "640x360" },
        { path: `./output-videos/output-480p.mp4`, resolution: "854x480" },
        { path: `./output-videos/output-720p.mp4`, resolution: "1280x720" },
        { path: `./output-videos/output-1080p.mp4`, resolution: "1920x1080" },
        { path: `./output-videos/output-1440p.mp4`, resolution: "2560x1440" },
        { path: `./output-videos/output-2160p.mp4`, resolution: "3840x2160" },
    ];
    const resData = {
        id: req.body.id,
        urls: [],
    };

    for (const outputPathInfo of outputPaths) {
        await transcodeVideoQuality(
            inputFilePath,
            outputPathInfo.path,
            outputPathInfo.resolution
        );
        const url = await generateSingedUploadUrl();
        const contentType = "video/" + req.body.fileType;
        // console.log(contentType);
        const fileContent = fs.readFileSync(outputPathInfo.path);
        await axios.put(url, fileContent, {
            headers: {
                "content-Type": contentType,
            },
        });
        const tempData ={
            url:  url.split("?")[0],
            quality: outputPathInfo.resolution
        };
        resData.urls.push(tempData)
    }

    console.log("\n\n\nAll conversions completed!\n\n\n")
    res.send(resData);
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});

async function downloadFile(url, filePath) {
    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, response.data);
        console.log(`Downloaded and saved file to ${filePath}`);
    } catch (error) {
        console.error("Error downloading file:", error);
    }
}
