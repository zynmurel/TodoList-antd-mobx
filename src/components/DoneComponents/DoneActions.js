import { Button } from "antd";
import { useContext } from "react";
import {
  MdDeleteForever,
  MdEditOff,
  MdOutlineSettingsBackupRestore,
} from "react-icons/md";
import { MyContext } from "../../context/MyContext";
import { ConfigProvider } from "antd";
const DoneActions = ({ id }) => {
  const {
    todos,
    selectedDoneRows,
    deleteTodo,
    setToUndone,
    setSelectedDoneRows,
  } = useContext(MyContext);
  return (
    <div className=" flex gap-2">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#b37feb",
          },
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            const objIndex = todos.findIndex((obj) => obj.key == id);
            setToUndone(objIndex);
            setSelectedDoneRows(selectedDoneRows.filter((sr) => sr !== id));
          }}
          icon={<MdOutlineSettingsBackupRestore className=" text-xl" />}
        />
      </ConfigProvider>
      <Button
        type="primary"
        danger
        icon={<MdDeleteForever className=" text-xl" />}
        onClick={() => {
          deleteTodo(id);
          setSelectedDoneRows(selectedDoneRows.filter((sr) => sr !== id));
        }}
      />
    </div>
  );
};

export default DoneActions;
