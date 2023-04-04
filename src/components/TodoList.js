import { Table, Button } from "antd";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { MdDoneOutline, MdDeleteForever } from "react-icons/md";
import UpdateTodoModal from "./TodoComponents/UpdateTodoModal";
import EmptyBox from "./emptyIcons/NoTodo";
import TodoForm from "./TodoComponents/TodoForm";
import tableColumns from "./tablecol/ToDoColumn";

const TodoList = ({ onFinish, form, todoNotification }) => {
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoData, setTodoData] = useState({});

  const {
    todos,
    selectedRows,
    setSelectedRows,
    deleteSelectedTodo,
    setSelectedToDone,
  } = useContext(TodoContext);

  const filteredTodo = todos.filter((td) => !td.done).reverse();

  const tableProps = {
    rowSelection: {
      selectedRowKeys: selectedRows,
      type: "checkbox",
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRowKeys);
      },
    },
    scroll: {
      y: 320,
      x: 400,
    },
    locale: { emptyText: <EmptyBox text="No To Do" /> },
  };

  const columns = tableColumns(
    { title: "To Do", index: "todo" },
    { title: "Date to Finish", index: "date" },
    {
      type: "todo",
      title: "Actions",
      props: { setOpen, setTodoId, setTodoData },
      todoNotification: todoNotification,
    }
  );

  const doneAllButton = () => {
    setSelectedToDone(selectedRows);
    todoNotification("success", `${selectedRows.length} Todo/s Done!`);
  };

  const deleteAllButton = () => {
    deleteSelectedTodo(selectedRows);
    todoNotification("info", `${selectedRows.length} Todo/s Deleted!`);
  };

  return (
    <>
      <TodoForm onFinish={onFinish} form={form} />
      <UpdateTodoModal
        open={open}
        todoData={todoData}
        setOpen={setOpen}
        setTodoId={setTodoId}
        todoId={todoId}
        todoNotification={todoNotification}
      />
      <Table
        pagination={false}
        rowSelection={tableProps.rowSelection}
        columns={columns}
        locale={tableProps.locale}
        dataSource={[...filteredTodo]}
        scroll={tableProps.scroll}
      />
      <div className="flex flex-row justify-end gap-2 mt-3">
        <Button
          className=" flex items-center gap-1"
          type="primary"
          icon={<MdDoneOutline />}
          disabled={selectedRows.length === 0}
          onClick={doneAllButton}
        >
          Done!
        </Button>
        <Button
          className=" flex items-center gap-1"
          type="primary"
          danger
          disabled={selectedRows.length === 0}
          icon={<MdDeleteForever />}
          onClick={deleteAllButton}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default observer(TodoList);
