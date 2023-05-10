const express = require('express');
const { Users } = require('../../../../models'); 
var apiResponse = require("../../helpers/apiResponse");
const { ObjectId } = require('mongodb');
const AWS = require('aws-sdk');
const multer = require('multer');
const app = express();
const s3 = new AWS.S3();

AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_REGION'
  });
  
  const upload = multer();

class utilController{
    // Handle file uploads to S3 using the signed URL
    async uploadFile(req, res) {  
        try {
            const { user } = res.user;
            let param = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, param);
            const filename = req.query.filename; // Get the filename from the query string

            const params = {
                Bucket: 'YOUR_BUCKET_NAME',
                Key: filename,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'public-read'
            };

            s3.putObject(params, (err, data) => {
                if (err) {
                console.error(err);
                return warn(res,"Error uploading file", {});
                
                }

                // File uploaded successfully
                return success(res,"File uploaded successfully.", {});
            });
            
		} catch (err) {
			return Error(res, err);
		}  
    }; 

    // Generate a signed URL for uploading a file to S3
    async deleteFile(req, res) {  
        try {
            const { user } = res.user;
            let param = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, param);
            const filename = req.query.filename; // Get the filename from the query string

            const params = {
                Bucket: 'YOUR_BUCKET_NAME',
                Key: filename,
                ContentType: req.headers['content-type'],
                ACL: 'public-read'
            };

            s3.getSignedUrl('putObject', params, (err, url) => {
                if (err) {
                console.error(err);
                return res.status(500).send('Error generating signed URL');
                }

                // Return the signed URL to the client
                res.send({ signedUrl: url });
            });
            
		} catch (err) {
			return Error(res, err);
		}  
    }; 

}

module.exports = new utilController()