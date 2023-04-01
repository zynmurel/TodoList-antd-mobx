import { Button } from "antd";
import { useContext } from "react";
import { MdDoneOutline, MdDeleteForever, MdEditOff } from "react-icons/md";
import { MyContext } from "../../context/MyContext";
import { ConfigProvider } from "antd";
const TodoActions = ({ id, setOpen, setTodoId, setTodoData }) => {
  const { todos, selectedRows, addSelectedRows, deleteTodo, setToDone } =
    useContext(MyContext);
  return (
    <div className=" flex gap-2">
      <Button
        type="primary"
        icon={<MdDoneOutline />}
        onClick={() => {
          const objIndex = todos.findIndex((obj) => obj.key == id);
          setToDone(objIndex);
          addSelectedRows(selectedRows.filter((sr) => sr !== id));
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
          icon={<MdEditOff />}
        />
      </ConfigProvider>
      <Button
        type="primary"
        danger
        icon={<MdDeleteForever />}
        onClick={() => {
          deleteTodo(id);
          addSelectedRows(selectedRows.filter((sr) => sr !== id));
        }}
      />
    </div>
  );
};

export default TodoActions;
