import DoneActions from "../DoneComponents/DoneActions";
import TodoActions from "../TodoComponents/TodoActions";

const tableColumns = (col1Title, col2Title, col3) => {
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
          width: col3.width,
        };
      case "done":
        return {
          title: col3.title,
          dataIndex: "key",
          render: (id) => <DoneActions id={id} />,
          width: col3.width,
        };
    }
  };
  const cols = [
    {
      title: col1Title,
      dataIndex: "todo",
      render: (text) => (
        <p className=" text-black text-xs lg:text-base font-medium m-0">
          {text}
        </p>
      ),
    },
    {
      title: col2Title,
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
    thirdCol(),
  ];
  return cols;
};

export default tableColumns;
