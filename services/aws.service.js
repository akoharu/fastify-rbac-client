const AWS = require('aws-sdk');
//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_accessKeyId,
    secretAccessKey: process.env.AWS_secretAccessKey
});
const s3 = new AWS.S3();

const s3upload = async (file, bucket, folder) => {
    const dataFile = await file.data;
    const params = {
        Bucket: bucket,
        Body : dataFile,
        Key : folder+Date.now()+"_"+file.filename
    };
    return await s3.upload(params).promise();
}
const s3delete = async (bucket, key) => {
    const params = {
        Bucket: bucket,
        Key : key
    };
    return await s3.deleteObject(params).promise();
}

module.exports = {
    s3upload, s3delete
}