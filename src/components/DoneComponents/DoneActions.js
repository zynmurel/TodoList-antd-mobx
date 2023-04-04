import { Button } from "antd";
import { useContext } from "react";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { TodoContext } from "../../context/TodoContext";
import PrimaryChanger from "../../theme/primaryChanger";
const DoneActions = ({ id }) => {
  const { todos, selectedDoneRows, setToUndone, setSelectedDoneRows } =
    useContext(TodoContext);
  const undoTodo = () => {
    const objIndex = todos.findIndex((obj) => obj.key === id);
    setToUndone(objIndex);
    setSelectedDoneRows(selectedDoneRows.filter((sr) => sr !== id));
  };

  return (
    <div className=" flex gap-2 justify-center items-center">
      <PrimaryChanger color={"#b37feb"}>
        <Button
          type="primary"
          onClick={undoTodo}
          icon={<MdOutlineSettingsBackupRestore className=" text-xl" />}
        />
      </PrimaryChanger>
    </div>
  );
};

export default DoneActions;
