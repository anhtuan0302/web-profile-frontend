import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import { Helmet } from "react-helmet";
import { register } from "../../../api/account";
import { Button, Space, Form, Input } from "antd";
import { Link } from "react-router-dom";

const AddAccount = () => {
  const [form] = Form.useForm();

  const pageContent = (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1>Accounts List</h1>
        <Link to="/admin/account" style={{ marginLeft: "30px" }}>
          <Button type="primary">Accounts List</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Add Account</title>
      </Helmet>
      <AdminLayout body={pageContent}></AdminLayout>
    </div>
  );
};

export default AddAccount;
