import axios from "axios";

export const postExteriorEsimtate = (fileName, fieldsObj) => {
  try{
  return axios.post(
    "https://kprt1ppwzc.execute-api.us-west-2.amazonaws.com/prod",
    {
      outputFileName: fileName,
      fields: fieldsObj,
    },
    { timeout: 10000, headers: { "Content-Type": "application/json" } }
  );
  }catch(e){
    console.log("Exception: " + e)
  }
};
