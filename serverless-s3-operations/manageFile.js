'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const BUCKET = 'todd-thomas-painting';
const OBJECTKEY = 'ExteriorTemplate.pdf';
const OBJECTKEY2 = 'new.pdf';

module.exports.appendText = text => {
  return getS3Object(BUCKET, OBJECTKEY).then(data => appendText(data.Body)).then(buffer => putS3Object(BUCKET, OBJECTKEY2, buffer)).then(() => getSignedUrl(BUCKET, OBJECTKEY2));
};

function getS3Object(bucket, key) {
  return S3.getObject({
    Bucket: bucket,
    Key: key,
    ResponseContentType: 'application/pdf'
  })
    .promise()
    .then(file => {
      return file;
    })
    .catch(error => {
      //file not found
      return putS3Object(bucket, key, '');
    });
}

function appendText(data) {
  return data;
}

function putS3Object(bucket, key, body) {
  return S3.putObject({
    Body: body,
    Bucket: bucket,
    ContentType: 'application/pdf',
    Key: key
  }).promise();
}

function getSignedUrl(bucket, key) {
  const params = { Bucket: bucket, Key: key };
  return S3.getSignedUrl('getObject', params);
}