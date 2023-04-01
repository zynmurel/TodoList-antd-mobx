import { createBrowserRouter } from "react-router-dom";
import TodoCard from "./components/TodoCard";
import TodoList from "./components/TodoComponents/TodoList";

export default createBrowserRouter([
  {
    path: "/",
    element: <TodoCard />,
    children: [
      {
        path: "/",
        element: <TodoList />,
      },
      {
        path: "/done",
        element: <>adfa</>,
      },
    ],
  },
]);
