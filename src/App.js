import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import TodoCard from "./pages/TodoCard";

function App() {
  return (
    <TodoProvider>
      <TodoCard />
    </TodoProvider>
  );
}

export default App;
