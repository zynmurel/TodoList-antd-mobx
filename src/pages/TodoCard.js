import { observer } from "mobx-react";
import { Card, Form } from "antd";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import DoneList from "../components/DoneList";
const TodoCard = () => {
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
      fontSize: 30,
      backgroundColor: "white",
      width: "100%",
      display: "flex",
      alignItems: "center",
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
        return <TodoList onFinish={onFinish} form={form} />;
      case "done":
        return <DoneList />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        title="To Do List/s"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        headStyle={cardStyle.headStyle}
        className="flex items-center justify-center flex-col shadow-lg w-11/12 lg:w-1/2 sm:w-3/5 bg-slate-100"
        bodyStyle={cardStyle.bodyStyle}
      >
        <ListToShow />
      </Card>
    </div>
  );
};

export default observer(TodoCard);
