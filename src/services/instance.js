import axios from "./axios";

export const axiosInstance = async (method, path, setData, data) => {
  if (typeof method === "string") {
    method = method.toLowerCase();
  }
  await axios[method](path, data)
    .then(function (response) {
      console.log(response);
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
