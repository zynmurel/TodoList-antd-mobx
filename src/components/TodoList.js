import { Table, Button } from "antd";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import { MdDoneOutline, MdDeleteForever } from "react-icons/md";
import UpdateTodoModal from "./TodoComponents/UpdateTodoModal";
import TodoActions from "./TodoComponents/TodoActions";
import EmptyBox from "../emptyIcons/NoTodo";

const TodoList = () => {
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoData, setTodoData] = useState({});
  const {
    todos,
    selectedRows,
    addSelectedRows,
    deleteSelectedTodo,
    setSelectedToDone,
  } = useContext(MyContext);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      addSelectedRows(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const columns = [
    {
      title: "Todo/s",
      dataIndex: "todo",
      render: (todo) => (
        <>
          <p className=" text-black text-xs lg:text-base font-medium m-0">
            {todo}
          </p>
        </>
      ),
    },
    {
      title: "Date to Finish",
      dataIndex: "date",
      render: (date) => (
        <>
          {date ? (
            <p className=" text-black text-xs m-0">{date.dateString}</p>
          ) : (
            <p className=" text-gray-500 text-xs m-0">No Date</p>
          )}
        </>
      ),
      width: "30%",
    },
    {
      title: "Action",
      dataIndex: "key",
      render: (id) => (
        <TodoActions
          id={id}
          setOpen={setOpen}
          setTodoId={setTodoId}
          setTodoData={setTodoData}
        />
      ),
      width: 150,
    },
  ];
  const filteredTodo = todos.filter((td) => !td.done);
  return (
    <>
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
