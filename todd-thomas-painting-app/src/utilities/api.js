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

export const postEstimateToDB = (
  clientName,
  clientPhone,
  clientEmail,
  clientAddress,
  projectType,
  longitude,
  latitude
) => {
  try {
    return axios.post(
      "https://kprt1ppwzc.execute-api.us-west-2.amazonaws.com/prod/DB",
      {
        clientName,
        clientPhone,
        clientEmail,
        clientAddress,
        projectType,
        longitude,
        latitude,
      },
      { timeout: 5000, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.log("Exception: " + e);
    return null;
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

export const getEstimates = () => {
  return axios.get(
    "https://kprt1ppwzc.execute-api.us-west-2.amazonaws.com/prod/estimates",
    { timeout: 10000, headers: { "Content-Type": "application/json" } }
  );
};

export const getCoordsFromAddress = (address) => {
  address = address
    .toLowerCase()
    .replace(" ", "+")
    .replace("az", "")
    .replace("85086", "");

  return axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+AZ+85086" +
      "&key=" +
      process.env.REACT_APP_GOOGLE_API_KEY,
    { timeout: 10000, headers: { "Content-Type": "application/json" } }
  );
};
