import axios from "axios";
import { useEffect, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://127.0.0.1:8000");
const OnchangeClient = () => {
  const [inpVal, setInpVal] = useState<string>("");

  //   socket api get call
  useEffect(() => {
    socket.on("receive_message", () => {
      axios
        .get("http://127.0.0.1:8000/onchange/data")
        .then((response) => setInpVal(response.data.data));
    });
  }, [socket]);

  //   get data first tym
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/onchange/data")
      .then((response) => setInpVal(response.data.data));
  }, []);

  //   onchange func to call api + socket msg emit + POST data
  const inpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
    await axios
      .post("http://127.0.0.1:8000/onchange/data", { data: e.target.value })
      .then((response) => console.log(response.data))
      .then(() =>
        socket.emit("send_message", { message: "Hello from client" })
      );
  };

  return (
    <div>
      <input type="text" value={inpVal} onChange={inpChange} />
    </div>
  );
};

export default OnchangeClient;
