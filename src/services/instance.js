import axios from "./axios";

export const axiosInstance = async (method, path, setData, data) => {
  if (typeof method === "string") {
    method = method.toLowerCase();
  }
  await axios[method](path, data)
    .then(async (response) => {
      await setData(response.data);
    })
    .catch((error) => {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
      }
      console.log("Error config:", error.config);
    });
};
