import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { getEducations, deleteEducation } from "../../../api/education";
import { Button, Table, Input, Space, Modal } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

const { confirm } = Modal;

const EducationsList = () => {
  const [educations, setEducations] = useState([]);
  const [filteredEducations, setFilteredEducations] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchEducations = async () => {
    const educations = await getEducations();
    setEducations(educations);
    setFilteredEducations(educations);
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  useEffect(() => {
    const filtered = educations.filter(
      (education) =>
        education.school.toLowerCase().includes(searchText.toLowerCase()) ||
        education.degree.toLowerCase().includes(searchText.toLowerCase()) ||
        education.major.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEducations(filtered);
  }, [searchText, educations]);

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this education?",
      icon: <DeleteOutlined />,
      content: "This action cannot be undone",
      async onOk() {
        await deleteEducation(id);
        fetchEducations();
      },
    });
  };

  const columns = [
    {
      title: "School Name",
      dataIndex: "school",
      key: "school",
      width: "20%",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      width: "15%",
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      width: "10%",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
      width: "10%",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      width: "15%",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => (text ? moment(text).format("DD/MM/YYYY") : "Present"),
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "25%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/education/edit/${record._id}`}>
            <Button
              icon={<EditOutlined />}
              style={{
                backgroundColor: "#faad14",
                color: "white",
                borderColor: "#faad14",
              }}
            ></Button>
          </Link>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            style={{
              backgroundColor: "#ff4d4f",
              color: "white",
              borderColor: "#ff4d4f",
            }}
          />
        </Space>
      ),
    },
  ];

  const pageContent = (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1>Educations List</h1>
        <Input
          placeholder="Search School, Degree or Major"
          style={{ marginLeft: "auto", width: 300 }}
          suffix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link to="/admin/education/add" style={{ marginLeft: "30px" }}>
          <Button type="primary">Add Education</Button>
        </Link>
      </div>
      <Table dataSource={filteredEducations} columns={columns} rowKey="id" />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Educations List</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default EducationsList;
