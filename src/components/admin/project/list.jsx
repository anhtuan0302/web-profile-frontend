import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { getProjects, deleteProject } from "../../../api/project";
import { Button, Table, Input, Space, Modal } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from 'moment';

const { confirm } = Modal;

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchProjects = async () => {
    const projects = await getProjects();
    setProjects(projects);
    setFilteredProjects(projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchText, projects]);

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this project?',
      icon: <DeleteOutlined />,
      content: 'This action cannot be undone',
      async onOk() {
        await deleteProject(id);
        fetchProjects();
      },
    })
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Project" style={{ width: "200px", height: "auto" }} />,
      width: "30%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/project/edit/${record._id}`}>
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
        <h1>Projects List</h1>
        <Input
          placeholder="Search Title"
          style={{ marginLeft: "auto", width: 300 }}
          suffix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link to="/admin/project/add" style={{ marginLeft: "30px" }}>
          <Button type="primary">Add Project</Button>
        </Link>
      </div>
      <Table dataSource={filteredProjects} columns={columns} rowKey="id" />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Projects List</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default ProjectsList;
