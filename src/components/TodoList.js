import { Table, Button } from "antd";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import { MdDoneOutline, MdDeleteForever } from "react-icons/md";
import UpdateTodoModal from "./TodoComponents/UpdateTodoModal";
import EmptyBox from "../emptyIcons/NoTodo";
import TodoForm from "./TodoComponents/TodoForm";
import tableColumns from "../tablecol/ToDoColumn";

const TodoList = ({ onFinish, form }) => {
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoData, setTodoData] = useState({});

  const {
    todos,
    selectedRows,
    setSelectedRows,
    deleteSelectedTodo,
    setSelectedToDone,
  } = useContext(MyContext);

  const filteredTodo = todos.filter((td) => !td.done).reverse();

  const rowSelection = {
    selectedRowKeys: selectedRows,
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const columns = tableColumns("To Do", "Date to Finish", {
    type: "todo",
    title: "Actions",
    width: 140,
    props: { setOpen, setTodoId, setTodoData },
  });

  return (
    <>
      <TodoForm onFinish={onFinish} form={form} />
      <UpdateTodoModal
        open={open}
        todoData={todoData}
        setOpen={setOpen}
        setTodoId={setTodoId}
        todoId={todoId}
      />
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        locale={{ emptyText: <EmptyBox text="No To Do" /> }}
        dataSource={[...filteredTodo]}
        scroll={{
          y: 320,
          x: 400,
        }}
      />
      <div className="flex flex-row justify-end gap-2 mt-3">
        <Button
          className=" flex items-center gap-1"
          type="primary"
          icon={<MdDoneOutline />}
          disabled={selectedRows.length === 0}
          onClick={() => setSelectedToDone(selectedRows)}
        >
          Done!
        </Button>
        <Button
          className=" flex items-center gap-1"
          type="primary"
          danger
          disabled={selectedRows.length === 0}
          icon={<MdDeleteForever />}
          onClick={() => deleteSelectedTodo(selectedRows)}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default observer(TodoList);
