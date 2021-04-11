"use strict";

const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const fs = require("fs");
const PDF = require("pdffiller-aws-lambda");

const BUCKET = "todd-thomas-painting";
const OBJECTKEY = "ExteriorTemplateForm.pdf";
const OBJECTKEY2 = "ExteriorFilled.pdf";
const TEMP_INPUT = "/tmp/template.pdf";
const TEMP_OUTPUT = "/tmp/formatted.pdf";

const fields = {
  clientNamePdf: "Bryan Thomas",
  clientAddressPdf: "2102 W Hemingway",
  clientEmailPdf: "bbb@bbb.com",
  clientPhonePdf: "6235519848",
  deluxePackagePricePdf: "$1,000",
  ultimatePackagePricePdf: "$2,000",
  maximumPackagePricePdf: "$3,000",
  notes: "Note Here",
};

module.exports.appendText = (text) => {
  return getS3Object(BUCKET, OBJECTKEY)
    .then((data) => writeFile(data))
    .then((buffer) => putS3Object(BUCKET, OBJECTKEY2, buffer))
    .then(() => getSignedUrl(BUCKET, OBJECTKEY2));
};

function getS3Object(bucket, key) {
  return S3.getObject({
    Bucket: bucket,
    Key: key,
    ResponseContentType: "application/pdf",
  })
    .promise()
    .then((file) => {
      return file;
    })
    .catch((error) => {
      //file not found
      return putS3Object(bucket, key, "");
    });
}

function writeFile(dataBody) {
  try {
    return fs.writeFile(TEMP_INPUT, dataBody, (writeErr) => {
      if (writeErr) throw writeErr;
      console.log("file saved succesfully");
      //Fill out PDF
      PDF.fillFormWithOptions(
        TEMP_INPUT,
        TEMP_OUTPUT,
        fields,
        true,
        "/tmp",
        (fillErr) => {
          if (fillErr) throw fillErr;
          console.log("pdf succesfully filled");

          //Readfile
          fs.readFile(TEMP_OUTPUT, (readErr, readResp) => {
            if (readErr) throw readErr;
            console.log("Read succesfully");
            return new Buffer(readResp, "binary");
          });
        }
      );
    });
  } catch (error) {
    console.log("THROWN ERROR:" + error);
  }
}

function putS3Object(bucket, key, body) {
  return S3.putObject({
    Body: body,
    Bucket: bucket,
    ContentType: "application/pdf",
    Key: key,
  }).promise();
}

function getSignedUrl(bucket, key) {
  const params = { Bucket: bucket, Key: key };
  return S3.getSignedUrl("getObject", params);
}
