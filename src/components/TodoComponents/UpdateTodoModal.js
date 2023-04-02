import { Modal, Input, DatePicker, Form, Button } from "antd";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";

const UpdateTodoModal = ({ open, todoData, setOpen, setTodoId, todoId }) => {
  const { editTodo } = useContext(MyContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      setTodo();
    }
  }, [open]);

  const setTodo = () => {
    form.setFieldsValue({
      todo: todoData.todo,
      date: todoData.date ? todoData.date.dateData : null,
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = (values) => {
    const updatedTodo = {
      todo: values.todo,
      date: values.date
        ? {
            dateData: values.date,
            dateString: values.date.format("MMMM Do YYYY"),
          }
        : null,
    };
    editTodo(todoId, updatedTodo);
    setOpen(false);
    setTodoId(null);
    form.resetFields();
  };

  return (
    <Modal
      forceRender
      title="Update Todo"
      open={open}
      footer={null}
      width={350}
      onCancel={handleCancel}
    >
      <div className=" flex items-center justify-center flex-col gap-2">
        <p className=" font-bold text-lg m-0">{todoData.todo}</p>
        <p className=" text-gray-600 m-0 -mt-3">
          {todoData.date ? todoData.date.dateString : "No Date"}
        </p>
        <Form
          name="todoForm"
          autoComplete="off"
          form={form}
          onFinish={handleOk}
          className="flex flex-col items-center"
        >
          <Form.Item name={"todo"} rules={[{ required: true }]}>
            <Input
              style={{ width: 250 }}
              size="large"
              placeholder="Update Todo"
            />
          </Form.Item>
          <Form.Item name={"date"} className="-mt-4">
            <DatePicker size="large" />
          </Form.Item>
          <div className=" flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateTodoModal;
