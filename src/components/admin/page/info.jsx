import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { getInfo, createInfo, updateInfo } from "../../../api/info";
import { Button, Form, Input } from "antd";

const Info = () => {
  const [info, setInfo] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfo();
        if (data.length > 0) {
          setInfo(data[0]);
          form.setFieldsValue(data[0]);
        }
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };

    fetchData();
  }, [form]);

  const handleSubmit = async (values) => {
    if (info) {
      const updateValues = Object.keys(values).reduce((acc, key) => {
        if (info[key] !== values[key]) {
          acc[key] = values[key];
        }
        return acc;
      }, {});

      if (Object.keys(updateValues).length > 0) {
        await updateInfo(info._id, updateValues);
      }
    } else {
      await createInfo(values);
    }
    const updatedInfo = await getInfo();
    setInfo(updatedInfo[0]);
    form.resetFields();
  };

  return (
    <div>
      <Helmet>
        <title>Profile Info</title>
      </Helmet>
      <AdminLayout body={
        <div>
          <h1>Profile Info</h1>
          <Form form={form} onFinish={handleSubmit} initialValues={info || {}} layout="horizontal">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input name" }]}>
              <Input placeholder="Enter Name" />
            </Form.Item>
            <Form.Item name="avatar" label="Avatar URL" rules={[{ required: true, message: "Please input avatar URL" }]}>
              <Input placeholder="Enter Avatar URL" />
            </Form.Item>
            <Form.Item name="cover" label="Cover URL" rules={[{ required: true, message: "Please input cover URL" }]}>
              <Input placeholder="Enter Cover Image URL" />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input address" }]}>
              <Input placeholder="Enter Address" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please input phone number" }]}>
              <Input placeholder="Enter Phone Number" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input email" }]}>
              <Input placeholder="Enter Email" />
            </Form.Item>
            <Form.Item name="website" label="Website">
              <Input placeholder="Enter Website URL" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
            <Button type="primary" htmlType="submit">{info ? 'Update Info' : 'Create Info'}</Button>
          </Form>
        </div>
      } />
    </div>
  );
};

export default Info;
