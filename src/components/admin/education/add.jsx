import React, { useState } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { createEducation } from "../../../api/education";
import { Button, Form, Input, DatePicker, Select, Modal, Row, Col, Checkbox } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';

const { Option } = Select;

const AddEducation = () => {
  const [form] = Form.useForm();
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);

  const handleSubmit = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to add this education?',
      content: 'This will add a new education to your list.',
      onOk: async () => {
        await createEducation({
          ...values,
          startDate: values.startDate.format('YYYY-MM-DD'),
          endDate: isCurrentlyStudying ? null : values.endDate.format('YYYY-MM-DD')
        });
        form.resetFields();
      }
    });
  };

  const handleCurrentlyStudyingChange = (e) => {
    setIsCurrentlyStudying(e.target.checked);
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
        <h1>Add Education</h1>
        <Link to="/admin/education" style={{ marginLeft: "auto" }}>
          <Button type="primary">Back to List</Button>
        </Link>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="school"
          label="School Name"
          rules={[{ required: true, message: 'Please input the school name!' }]}
        >
          <Input placeholder="Enter school name" />
        </Form.Item>
        <Form.Item
          name="degree"
          label="Degree"
          rules={[{ required: true, message: 'Please select the degree!' }]}
        >
          <Select placeholder="Select degree">
            <Option value="High School">High School</Option>
            <Option value="Bachelor">Bachelor</Option>
            <Option value="Master">Master</Option>
            <Option value="Doctorate">Doctorate</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="major"
          label="Major"
          rules={[{ required: true, message: 'Please input the major!' }]}
        >
          <Input placeholder="Enter major" />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={isCurrentlyStudying} onChange={handleCurrentlyStudyingChange}>
            I am currently studying in this role
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
            {!isCurrentlyStudying && (
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: !isCurrentlyStudying, message: 'Please select the end date!' }]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} disabledDate={disabledEndDate} />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Form.Item
          name="gpa"
          label="GPA"
          rules={[{ required: true, message: 'Please input the GPA!' }]}
        >
            <Input placeholder="Enter GPA" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Education
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Add Education</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default AddEducation;
