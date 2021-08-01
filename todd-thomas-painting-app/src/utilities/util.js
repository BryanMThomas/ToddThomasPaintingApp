export const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var ss = today.getSeconds();
  return mm + "-" + dd + "-" + yyyy + "_" + ss;
};

export const compareDatesS3Objects = (a, b) => {
  return Date.parse(b.LastModified) - Date.parse(a.LastModified);
};

export const formatDate = (inputDate) => {
  let date = new Date(Date.parse(inputDate));
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  return mm + "-" + dd + "-" + yyyy;
};
