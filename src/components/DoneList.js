import { Table, Button } from "antd";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { MdDeleteForever } from "react-icons/md";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import EmptyBox from "../emptyIcons/NoTodo";

const DoneList = () => {
  const { todos, selectedDoneRows, addSeletedDoneRows, deleteSelectedTodo } =
    useContext(MyContext);
  const rowSelection = {
    selectedRowKeys: selectedDoneRows,
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      addSeletedDoneRows(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const columns = [
    {
      title: "Done",
      dataIndex: "todo",
      render: (text) => (
        <p className=" text-black text-xs lg:text-base font-medium m-0">
          {text}
        </p>
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
      render: (id) => <></>,
      width: 150,
    },
  ];
  const doneTodo = todos.filter((td) => td.done === true);
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
