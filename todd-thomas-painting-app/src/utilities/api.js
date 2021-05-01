import axios from "axios";

export const postEsimtate = (
  estimateTemplate,
  s3FilePath,
  fileName,
  fieldsObj
) => {
  try {
    return axios.post(
      "https://kprt1ppwzc.execute-api.us-west-2.amazonaws.com/prod",
      {
        outputFileName: fileName,
        fields: fieldsObj,
        estimateTemplate: estimateTemplate,
        s3FilePath: s3FilePath,
      },
      { timeout: 10000, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.log("Exception: " + e);
  }
};

export const postCash = (value) => {
  try {
    return axios.post(
      "https://kprt1ppwzc.execute-api.us-west-2.amazonaws.com/prod/cash",
      {
        value: value,
      },
      { timeout: 10000, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.log("Exception: " + e);
  }
};
