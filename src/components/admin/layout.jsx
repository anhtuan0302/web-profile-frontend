import React, { useState } from "react";
import styled from "styled-components";
import { Button, Layout, Menu, theme } from "antd";
import {
    UserOutlined,
    ContactsOutlined,
    FileTextOutlined,
    ReadOutlined,
    BarsOutlined
} from '@ant-design/icons';

const Logourl = process.env.PUBLIC_URL + "/images/logo-white.png";

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ body }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const getSelectedMenuKey = (path) => {
        if (path.startsWith('/admin/info')) {
            return '/admin/info/*';
        }
        else if (path.startsWith('/admin/experience')) {
            return '/admin/experience/*';
        }
        else if (path.startsWith('/admin/education')) {
            return '/admin/education/*';
        }
        else if (path.startsWith('/admin/project')) {
            return '/admin/project/*';
        }
        else if (path.startsWith('/admin/account')) {
            return '/admin/account/*';
        }
        return path;
    }

    const currentPath = window.location.pathname;
    const selectedKey = getSelectedMenuKey(currentPath);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Logo>
                     <img src={Logourl}/>
                </Logo> 
                <Menu
                    style={{ fontSize: '16px' }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[selectedKey]}
                    items={[
                        {
                            key: '/admin/info/*',
                            icon: <ContactsOutlined style={{fontSize: '21px'}}/>,
                            label: 'Info',
                            style: {marginBottom: '15px'},
                            onClick: () => {
                                window.location.href = '/admin/info';
                            }
                        },
                        {
                            key: '/admin/experience/*',
                            icon: <FileTextOutlined style={{fontSize: '21px'}}/>,
                            label: 'Experience',
                            style: {marginBottom: '15px'},
                            onClick: () => {
                                window.location.href = '/admin/experience';
                            }
                        },
                        {
                            key: '/admin/education/*',
                            icon: <ReadOutlined style={{fontSize: '21px'}}/>,
                            label: 'Education',
                            style: {marginBottom: '15px'},
                            onClick: () => {
                                window.location.href = '/admin/education';
                            }
                        },
                        {
                            key: '/admin/project/*',
                            icon: <BarsOutlined style={{fontSize: '21px'}}/>,
                            label: 'Project',
                            style: {marginBottom: '80px'},
                            onClick: () => {
                                window.location.href = '/admin/project';
                            }
                        },
                        {
                            key: '/admin/account/*',
                            icon: <UserOutlined style={{fontSize: '21px'}}/>,
                            label: 'My account',
                            onClick: () => {
                                window.location.href = '/admin/account';
                            }
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                </Header>
                <Content
                    style={{
                        margin: '24px 32px 0px 32px',
                        padding: '24px 32px',
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {body}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Created by Ngo Anh Tuan ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

const Logo = styled.div`
    text-align: center;
    margin: 0 0 40px 0;
    img {
        width: 80%;
    }
`;