import { Table, Button } from "antd";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { MdDeleteForever } from "react-icons/md";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import EmptyBox from "../emptyIcons/NoTodo";
import tableColumns from "../tablecol/ToDoColumn";

const DoneList = () => {
  const { todos, selectedDoneRows, setSelectedDoneRows, deleteSelectedTodo } =
    useContext(MyContext);

  const doneTodo = todos.filter((td) => td.done === true).reverse();

  const rowSelection = {
    selectedRowKeys: selectedDoneRows,
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedDoneRows(selectedRowKeys);
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
  };

  const columns = tableColumns("To Do", "Date to Finish", {
    type: "done",
    width: 100,
    title: "Actions",
    //props: { setOpen, setTodoId, setTodoData },
  });

  return (
    <div>
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={[...doneTodo]}
        locale={{ emptyText: <EmptyBox text="No Done To Do" /> }}
        scroll={{
          y: 380,
          x: 400,
        }}
      />

      <div className="flex flex-row justify-end gap-2 mt-3">
        <Button
          className=" flex items-center gap-1"
          type="primary"
          danger
          disabled={selectedDoneRows.length === 0}
          icon={<MdDeleteForever />}
          onClick={() => deleteSelectedTodo(selectedDoneRows)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default observer(DoneList);
