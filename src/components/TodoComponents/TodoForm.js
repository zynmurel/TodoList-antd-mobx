import { Button, Space, DatePicker, Form, Input } from "antd";
const TodoForm = ({ form, onFinish }) => {
  const rules = [
    {
      required: true,
    },
  ];
  const styles = {
    spacecompact: {
      width: "100%",
    },
  };
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      className="flex flex-col lg:flex-row-reverse item-center justify-center gap-3"
    >
      <Form.Item name="todo" rules={rules} className=" mb-2 flex-auto">
        <Space.Compact size="large" style={styles.spacecompact}>
          <Input placeholder="Input Todo" />
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item name="date" className=" flex justify-center">
        <DatePicker size="large" placeholder="Date to Finish" />
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
