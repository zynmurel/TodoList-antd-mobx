import "./App.css";
import { TodoContext, TodoListClass } from "./context/TodoContext";
import TodoCard from "./pages/TodoCard";

function App() {
  const todoListClass = new TodoListClass();
  return (
    <TodoContext.Provider value={todoListClass}>
      <TodoCard />
    </TodoContext.Provider>
  );
}

export default App;
