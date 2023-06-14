import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.113.57:8080/portal",
});
