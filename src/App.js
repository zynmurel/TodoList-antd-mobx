import "./App.css";
import TodoContextProvider from "./context/TodoContext";
import TodoCard from "./pages/TodoCard";

function App() {
  return (
    <TodoContextProvider>
      <TodoCard />
    </TodoContextProvider>
  );
}

export default App;
