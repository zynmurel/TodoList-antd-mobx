import DoneActions from "../DoneComponents/DoneActions";
import TodoActions from "../TodoComponents/TodoActions";

const tableColumns = (col1, col2, col3) => {
  const thirdCol = () => {
    switch (col3.type) {
      case "todo":
        return {
          title: col3.title,
          dataIndex: "key",
          render: (id) => (
            <TodoActions
              id={id}
              setOpen={col3.props.setOpen}
              setTodoId={col3.props.setTodoId}
              setTodoData={col3.props.setTodoData}
            />
          ),
          width: 100,
        };
      case "done":
        return {
          title: col3.title,
          dataIndex: "key",
          render: (id) => <DoneActions id={id} />,
          width: 100,
        };
      default:
        return "";
    }
  };
  const cols = [
    {
      title: col1.title,
      dataIndex: col1.index,
      render: (text) => (
        <p className=" text-black text-xs lg:text-base font-medium m-0">
          {text}
        </p>
      ),
    },
    {
      title: col2.title,
      dataIndex: col2.index,
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
    thirdCol(),
  ];
  return cols;
};

export default tableColumns;
