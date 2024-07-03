import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AdminLayout from "../layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProject, updateProject } from "../../../api/project";
import { Button, Form, Input, Modal } from "antd";

const EditProject = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProject(id);
      form.setFieldsValue({
        ...data
      });
    };
    fetchProject();
  }, [id, form]);

  const handleSubmit = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to update this project?',
      content: 'This will modify the project details.',
      onOk: async () => {
        const formattedValues = {
          ...values
        };
        await updateProject(id, formattedValues);
        navigate('/admin/project');
      }
    });
  };

  const pageContent = (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <h1>Edit Project</h1>
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
            Update Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Edit Project</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default EditProject;
