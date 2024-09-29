'use client' // Diperlukan untuk menggunakan hooks

import { Form, Input, Button, Card } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onFinish = (values) => {
    setLoading(true)
    // Simulasi login sederhana
    setTimeout(() => {
      sessionStorage.setItem('loggedIn', true) // Tandai user sebagai sudah login
      router.push('/dashboard/list') // Arahkan ke halaman dashboard setelah login
    }, 1000)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Masukkan username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Masukkan password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
