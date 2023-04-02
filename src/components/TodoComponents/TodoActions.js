import { Button } from "antd";
import { useContext } from "react";
import { MdDoneOutline, MdDeleteForever, MdEditOff } from "react-icons/md";
import { MyContext } from "../../context/MyContext";
import { ConfigProvider } from "antd";
const TodoActions = ({ id, setOpen, setTodoId, setTodoData }) => {
  const { todos, selectedRows, setSelectedRows, deleteTodo, setToDone } =
    useContext(MyContext);

  return (
    <div className=" flex gap-2">
      <Button
        type="primary"
        icon={<MdDoneOutline className=" text-xl" />}
        onClick={() => {
          const objIndex = todos.findIndex((obj) => obj.key == id);
          setToDone(objIndex);
          setSelectedRows(selectedRows.filter((sr) => sr !== id));
        }}
      />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffa940",
          },
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            const objIndex = todos.findIndex((obj) => obj.key == id);
            setOpen(true);
            //editTodo(objIndex, "Maui");
            setTodoId(objIndex);
            setTodoData(todos[objIndex]);
          }}
          icon={<MdEditOff className=" text-xl" />}
        />
      </ConfigProvider>
      <Button
        type="primary"
        danger
        icon={<MdDeleteForever className=" text-xl" />}
        onClick={() => {
          deleteTodo(id);
          setSelectedRows(selectedRows.filter((sr) => sr !== id));
        }}
      />
    </div>
  );
};

export default TodoActions;
