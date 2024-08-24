import { useState, useEffect } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const callBackend = async () => {
      try {
        const data = await fetch("http://localhost:3000/todos");
        const todoData = await data.json();
        console.log(todoData);
        setTodos(todoData.todos);
      } catch (error) {
        console.log(error);
      }
    };
    callBackend();
  }, []);

  return (
    <main>
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "600",
          marginBottom: "0", // Reduce gap between h1 and h4
        }}
      >
        A full stack Todo application
      </h1>
      <h4
        style={{
          marginTop: "0", // Reduce gap between h1 and h4
          paddingBottom: "2vh",
        }}
      >
        by Darshan
      </h4>
      <CreateTodo />
      <Todos todos={todos} />
    </main>
  );
}

export default App;
