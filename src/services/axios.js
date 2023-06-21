import axios from "axios";
// import env from "react-dotenv";

export default axios.create({
  baseURL: "http://65.21.195.218:8080/portal/api",
});
