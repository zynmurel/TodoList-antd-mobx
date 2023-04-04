import { observer } from "mobx-react";
import { Card, Form, notification } from "antd";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import DoneList from "../components/DoneList";
const TodoCard = () => {
  const [todoApi, contextHolder] = notification.useNotification();
  const todoNotification = (type, description) => {
    todoApi[type]({
      description: description,
      duration: 2,
    });
  };

  const { addTodo } = useContext(TodoContext);
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState("todos");

  const tabList = [
    {
      key: "todos",
      tab: "Todo/s",
    },
    {
      key: "done",
      tab: "Done",
    },
  ];

  const cardStyle = {
    headStyle: {
      fontSize: 40,
      backgroundColor: "white",
      display: "flex",
      fontWeight: "bolder",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#002E1B",
    },
    bodyStyle: { height: 600, width: "100%" },
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const onFinish = (values) => {
    addTodo({
      todo: values.todo,
      date: values.date
        ? {
            dateData: values.date,
            dateString: values.date.format("MMMM Do YYYY"),
          }
        : null,
    });
    form.resetFields();
  };

  const ListToShow = () => {
    switch (activeTabKey) {
      case "todos":
        return (
          <TodoList
            onFinish={onFinish}
            form={form}
            todoNotification={todoNotification}
          />
        );
      case "done":
        return <DoneList todoNotification={todoNotification} />;

      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex sm:items-center justify-center">
      {contextHolder}
      <Card
        title="TO DO LIST"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        headStyle={cardStyle.headStyle}
        className="flex  flex-col shadow-lg lg:w-1/2 sm:w-3/5 bg-slate-100"
        bodyStyle={cardStyle.bodyStyle}
      >
        <ListToShow />
      </Card>
    </div>
  );
};

export default observer(TodoCard);
