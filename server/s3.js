const { S3 } = require( 'aws-sdk');
const dotenv = require( 'dotenv');
const { randomBytes } = require( 'crypto');
const { promisify } = require( 'util');


dotenv.config();

const region  = "us-east-1";
const bucketName = "video-transcoder-storage";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 =  new S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateSingedUploadUrl() {

    const rawBytes = randomBytes(16);
    const imageName  = rawBytes.toString('hex');
    console.log(imageName);
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 180
    }

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}

module.exports = generateSingedUploadUrl;