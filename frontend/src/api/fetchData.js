import axios from "axios";

export default async function fetchData() {
  const { data } = await axios.get("http://localhost:3000/");
  console.log(data);
  return data;
}
