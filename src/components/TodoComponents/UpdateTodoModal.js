import { Modal, Input, DatePicker, Form, Button } from "antd";
import { useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";

const UpdateTodoModal = ({
  open,
  todoData,
  setOpen,
  setTodoId,
  todoId,
  todoNotification,
}) => {
  const { editTodo } = useContext(TodoContext);
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
    todoNotification("success", `To Do Updated!`);
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
        <Form
          name="todoForm"
          autoComplete="off"
          form={form}
          onFinish={handleOk}
          className="flex flex-col items-center gap-4"
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
