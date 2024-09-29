'use client' // Diperlukan untuk hooks
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import AppHeader from '@/components/AppHeader'
export default function DashboardLayout({ children }) {
  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const handleMenuClick = (e) => {
    router.push(`/dashboard/${e.key}`) // Pindah ke halaman berdasarkan key
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <>
      <AppHeader />
      <Layout style={{ height: '120vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['list']} // Menu default yang dipilih
            onClick={handleMenuClick}
          >
            <Menu.Item key="list" icon={<UserOutlined />}>
              List
            </Menu.Item>
            <Menu.Item key="menu" icon={<VideoCameraOutlined />}>
              Menu
            </Menu.Item>
            <Menu.Item key="settings" icon={<UploadOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children} {/* Tempatkan konten halaman di sini */}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
