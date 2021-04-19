const PDF = require("pdffiller-aws-lambda");
const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const fs = require("fs");
const { Http2ServerResponse } = require("http2");

const TEMP_INPUT = "/tmp/template.pdf";
const TEMP_OUTPUT = "/tmp/formatted.pdf";

module.exports.getExteriorEstimate = (event, context, callback) => {
  console.log("EVENT: " + JSON.stringify(event));
  const outputFileName = event.outputFileName;
  const fields = event.fields;
  const estimateTemplate = event.estimateTemplate;
  const s3FilePath = event.s3FilePath;

  console.log(
    "fileName: " + outputFileName + "\nfields: " + JSON.stringify(fields)
  );
  const bucket = "todd-thomas-painting";
  const outputFilePath = s3FilePath + "/" + outputFileName + ".pdf";

  try {
    return S3.getObject(
      { Bucket: bucket, Key: estimateTemplate },
      (err, getResp) => {
        if (err) throw err;

        console.log("file read successfully");

        return fs.writeFile(TEMP_INPUT, getResp.Body, (writeErr) => {
          if (writeErr) throw writeErr;
          console.log("file saved successfully");

          return PDF.fillFormWithOptions(
            TEMP_INPUT,
            TEMP_OUTPUT,
            fields,
            true,
            "/tmp",
            (fillErr) => {
              if (fillErr) throw fillErr;
              console.log("pdf successfully filled");

              return fs.readFile(TEMP_OUTPUT, (readErr, readResp) => {
                if (readErr) throw readErr;

                const saveParams = {
                  Bucket: bucket,
                  Key: outputFilePath,
                  Body: new Buffer(readResp, "binary"),
                  ContentType: "application/pdf",
                };

                return S3.putObject(saveParams, (saveErr, data) => {
                  if (saveErr) throw saveErr;
                  console.log("pdf successfully saved");
                  let url =
                    "https://todd-thomas-painting.s3-us-west-2.amazonaws.com/" +
                    outputFilePath;
                  const response = {
                    statusCode: 200,
                    body: { success: true, url: url },
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                    },
                  };
                  console.log("RESPONSE: " + JSON.stringify(response));
                  return response;
                  callback(null, response);
                });
              });
            }
          );
        });
      }
    );
  } catch (e) {
    console.log("An error occurred");
    console.log(e);
    return { statusCode: 500, body: false };
    callback(e, { statusCode: 500, body: true });
  }
};
