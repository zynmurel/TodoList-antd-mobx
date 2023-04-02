import { ConfigProvider } from "antd";

const PrimaryChanger = ({ children, color }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default PrimaryChanger;
