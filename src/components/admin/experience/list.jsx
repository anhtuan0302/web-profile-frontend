import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { getExperiences, deleteExperience } from "../../../api/experience";
import { Button, Table, Input, Space, Modal } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from 'moment';

const { confirm } = Modal;

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchExperiences = async () => {
    const experiences = await getExperiences();
    setExperiences(experiences);
    setFilteredExperiences(experiences);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    const filtered = experiences.filter(
      (experience) =>
        experience.title.toLowerCase().includes(searchText.toLowerCase()) ||
        experience.type.toLowerCase().includes(searchText.toLowerCase()) ||
        experience.company.toLowerCase().includes(searchText.toLowerCase()) ||
        experience.location.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredExperiences(filtered);
  }, [searchText, experiences]);

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this experience?',
      icon: <DeleteOutlined />,
      content: 'This action cannot be undone',
      async onOk() {
        await deleteExperience(id);
        fetchExperiences();
      },
    })
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "10%",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "15%",
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: "15%",
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        render: (text) => moment(text).format('DD/MM/YYYY'),
        width: "15%",
    },
    {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        render: (text) => text ? moment(text).format('DD/MM/YYYY') : "Present",
        width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "25%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/experience/edit/${record._id}`}>
            <Button
              icon={<EditOutlined />}
              style={{
                backgroundColor: "#faad14",
                color: "white",
                borderColor: "#faad14",
              }}
            ></Button>
          </Link>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} style={{ backgroundColor: "#ff4d4f", color: "white", borderColor: "#ff4d4f" }} />
        </Space>
      ),
    },
  ];

  const pageContent = (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1>Experiences List</h1>
        <Input
          placeholder="Search Title, Type, Company or Location"
          style={{ marginLeft: "auto", width: 350 }}
          suffix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link to="/admin/experience/add" style={{ marginLeft: "30px" }}>
          <Button type="primary">Add Experience</Button>
        </Link>
      </div>
      <Table dataSource={filteredExperiences} columns={columns} rowKey="id" />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Experiences List</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default ExperiencesList;
