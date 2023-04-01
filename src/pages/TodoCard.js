import { observer } from "mobx-react";
import { Card, Form } from "antd";
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoComponents/TodoForm";
import DoneList from "../components/DoneList";
const TodoCard = () => {
  const { addTodo } = useContext(MyContext);
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState("tab1");

  const tabList = [
    {
      key: "tab1",
      tab: "Todo/s",
    },
    {
      key: "tab2",
      tab: "Done",
    },
  ];

  const cardStyle = {
    headStyle: {
      fontSize: 30,
      width: "100%",
    },
    bodyStyle: { height: 600, width: "100%" },
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

  const onTab1Change = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        title="TODO List/s"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTab1Change}
        headStyle={cardStyle.headStyle}
        className="flex items-center justify-center flex-col shadow-lg w-1/2 bg-slate-100"
        bodyStyle={cardStyle.bodyStyle}
      >
        {activeTabKey === "tab1" && (
          <>
            <TodoForm onFinish={onFinish} form={form} />
            <TodoList />
          </>
        )}
        {activeTabKey === "tab2" && (
          <>
            <DoneList />
          </>
        )}
      </Card>
    </div>
  );
};

export default observer(TodoCard);
