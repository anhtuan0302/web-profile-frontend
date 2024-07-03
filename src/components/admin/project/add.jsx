import React, { useState } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { createProject } from "../../../api/project";
import { Button, Form, Input, Modal } from "antd";
import { Link } from "react-router-dom";

const AddProject = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to add this project?',
      content: 'This will add a new project to your list.',
      onOk: async () => {
        await createProject({
          ...values
        });
        form.resetFields();
      }
    });
  };

  const pageContent = (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <h1>Add Project</h1>
        <Link to="/admin/project" style={{ marginLeft: "auto" }}>
          <Button type="primary">Back to List</Button>
        </Link>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: 'Please input the image URL!' }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Add Project</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default AddProject;
