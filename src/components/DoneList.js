import { Table, Button } from "antd";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import {
  MdDeleteForever,
  MdOutlineSettingsBackupRestore,
} from "react-icons/md";
import { observer } from "mobx-react";
import EmptyBox from "./emptyIcons/NoTodo";
import tableColumns from "./tablecol/ToDoColumn";
import PrimaryChanger from "../theme/primaryChanger";
import moment from "moment";

const DoneList = ({ todoNotification }) => {
  const {
    todos,
    selectedDoneRows,
    setSelectedDoneRows,
    deleteSelectedTodo,
    setSelectedToUndone,
  } = useContext(TodoContext);

  const doneTodo = todos.filter((td) => td.done === true);
  const doneSortByFinished = doneTodo.sort((a, b) => {
    const dateA = moment(a.finished.dateString, "MMMM D, YYYY h:mm A");
    const dateB = moment(b.finished.dateString, "MMMM D, YYYY h:mm A");
    if (dateA.isBefore(dateB)) {
      return 1;
    }
    if (dateA.isAfter(dateB)) {
      return -1;
    }
    return 0;
  });

  const rowSelection = {
    selectedRowKeys: selectedDoneRows,
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedDoneRows(selectedRowKeys);
    },
  };

  const columns = tableColumns(
    { title: "To Do", index: "todo" },
    { title: "Finished", index: "finished" },
    {
      type: "done",
      title: "Actions",
    }
  );

  const undoButton = () => {
    setSelectedToUndone(selectedDoneRows);
    todoNotification("info", `${selectedDoneRows.length} Undo/s `);
  };

  const deleteAllButton = () => {
    deleteSelectedTodo(selectedDoneRows);
    todoNotification("info", `${selectedDoneRows.length} Todo/s Deleted!`);
  };

  return (
    <div>
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={[...doneSortByFinished]}
        locale={{ emptyText: <EmptyBox text="No Done To Do" /> }}
        scroll={{
          y: 380,
          x: 400,
        }}
      />

      <div className="flex flex-row justify-end gap-2 mt-3">
        <PrimaryChanger color={"#b37feb"}>
          <Button
            className=" flex items-center gap-1"
            type="primary"
            disabled={selectedDoneRows.length === 0}
            icon={<MdOutlineSettingsBackupRestore />}
            onClick={undoButton}
          >
            Undo
          </Button>
        </PrimaryChanger>
        <Button
          className=" flex items-center gap-1"
          type="primary"
          danger
          disabled={selectedDoneRows.length === 0}
          icon={<MdDeleteForever />}
          onClick={deleteAllButton}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default observer(DoneList);
