import "./App.css";
import { MyContext, TodoListClass } from "./context/MyContext";
import TodoCard from "./pages/TodoCard";

function App() {
  const todoListClass = new TodoListClass();
  return (
    <MyContext.Provider value={todoListClass}>
      <TodoCard />
    </MyContext.Provider>
  );
}

export default App;
