import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { getAccounts } from "../../../api/account";
import { Button, Table, Space, Form, Input } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts);
      setFilteredAccounts(accounts);
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const filtered = accounts.filter(
      (account) =>
        account.username.toLowerCase().includes(searchText.toLowerCase()) ||
        account.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [searchText, accounts]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "25%",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "25%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/account/${record.id}/edit`}>
            <Button
              icon={<EditOutlined />}
              style={{
                backgroundColor: "#faad14",
                color: "white",
                borderColor: "#faad14",
              }}
            ></Button>
          </Link>
        </Space>
      ),
    },
  ];

  const pageContent = (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1>Accounts List</h1>
        <Input
          placeholder="Search Username or Full name"
          style={{ marginLeft: "auto", width: 250 }}
          suffix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link to="/admin/account/add" style={{ marginLeft: "30px" }}>
          <Button type="primary">Add Account</Button>
        </Link>
      </div>
      <Table dataSource={filteredAccounts} columns={columns} rowKey="id" />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Accounts List</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default AccountList;
