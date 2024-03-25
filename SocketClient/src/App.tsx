import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import * as io from "socket.io-client";
// import type { Socket } from "socket.io-client";

const socket = io.connect("http://127.0.0.1:8000");

// Define a type for your todo items
type Todo = {
  id: number;
  work: string;
};

function App() {
  const [todoVal, setTodoVal] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); // Specify the type of state

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/todo/data")
      .then((response) => setTodos(response.data));
  }, []);

  useEffect(() => {
    socket.on("receive_message", () => {
      axios
        .get("http://127.0.0.1:8000/todo/data")
        .then((response) => setTodos(response.data));
    });
  }, [socket]);

  const inpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoVal(e.target.value);
  };
  function addTodo() {
    let data = { id: todos.length + 1, work: todoVal };
    setTodos((prev) => {
      return [...prev, data];
    });
    axios.post("http://127.0.0.1:8000/todo/data", data).then(() => {
      socket.emit("send_message", { message: "Hello from client" });
      setTodoVal("");
    });
  }
  return (
    <div className="App">
      <div>
        <input value={todoVal} onChange={inpChange} />
        <button onClick={addTodo}>Add todo</button>
        <div>
          {todos.map((item) => {
            return <h4 key={item.id}>{item.work}</h4>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
