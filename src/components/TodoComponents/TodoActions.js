import { Button } from "antd";
import { useContext } from "react";
import { MdEditOff } from "react-icons/md";
import { TodoContext } from "../../context/TodoContext";
import PrimaryChanger from "../../theme/primaryChanger";
const TodoActions = ({ id, setOpen, setTodoId, setTodoData }) => {
  const { todos } = useContext(TodoContext);
  const editTodo = () => {
    const objIndex = todos.findIndex((obj) => obj.key === id);
    setOpen(true);
    setTodoId(objIndex);
    setTodoData(todos[objIndex]);
  };

  return (
    <div className=" flex gap-2 justify-center items-center">
      <PrimaryChanger color={"#ffa940"}>
        <Button
          type="primary"
          onClick={editTodo}
          icon={<MdEditOff className=" text-xl" />}
        />
      </PrimaryChanger>
    </div>
  );
};

export default TodoActions;
