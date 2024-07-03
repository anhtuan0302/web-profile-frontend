import React, { useState } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { createExperience } from "../../../api/experience";
import { Button, Form, Input, DatePicker, Select, Modal, Row, Col, Checkbox } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';

const { Option } = Select;

const AddExperience = () => {
  const [form] = Form.useForm();
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const handleSubmit = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to add this experience?',
      content: 'This will add a new experience to your list.',
      onOk: async () => {
        await createExperience({
          ...values,
          startDate: values.startDate.format('YYYY-MM-DD'),
          endDate: isCurrentlyWorking ? null : values.endDate.format('YYYY-MM-DD')
        });
        form.resetFields();
      }
    });
  };

  const handleCurrentlyWorkingChange = (e) => {
    setIsCurrentlyWorking(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ endDate: null });
    }
  };

  const disabledEndDate = (current) => {
    const startDate = form.getFieldValue('startDate');
    return current && current < startDate.startOf('day');
  };

  const pageContent = (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <h1>Add Experience</h1>
        <Link to="/admin/experience" style={{ marginLeft: "auto" }}>
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
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select the type!' }]}
        >
          <Select placeholder="Select type">
            <Option value="Internship">Internship</Option>
            <Option value="Fulltime">Fulltime</Option>
            <Option value="Parttime">Parttime</Option>
            <Option value="Freelance">Freelance</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: 'Please input the company!' }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={isCurrentlyWorking} onChange={handleCurrentlyWorkingChange}>
            I am currently working in this role
          </Checkbox>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: 'Please select the start date!' }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {!isCurrentlyWorking && (
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: !isCurrentlyWorking, message: 'Please select the end date!' }]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} disabledDate={disabledEndDate} />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Experience
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Add Experience</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default AddExperience;
