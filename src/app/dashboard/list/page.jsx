'use client'

import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Row, Col, Modal, Space } from 'antd'
import {
  SearchOutlined,
  ClearOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import axios from 'axios'

export default function ListPage() {
  const [universities, setUniversities] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://universities.hipolabs.com/search?country=indonesia',
        )
        setUniversities(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSearch = () => {
    const filtered = universities.filter(
      (university) =>
        university.name.toLowerCase().includes(searchText.toLowerCase()) &&
        university.country.toLowerCase().includes(searchCountry.toLowerCase()),
    )
    setFilteredData(filtered)
    setIsModalVisible(false) 
  }

  const handleClear = () => {
    setSearchText('')
    setSearchCountry('')
    setFilteredData(universities) 
    setIsModalVisible(false)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Nama Universitas',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Domain',
      dataIndex: 'domains',
      key: 'domains',
      render: (domains) => domains.join(', '), // Menampilkan semua domain sebagai string
    },
    {
      title: 'Website',
      dataIndex: 'web_pages',
      key: 'web_pages',
      render: (web_pages) => (
        <a href={web_pages[0]} target="_blank" rel="noopener noreferrer">
          {web_pages[0]}
        </a>
      ),
    },
    {
      title: 'Negara',
      dataIndex: 'country',
      key: 'country',
    },
  ]

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Cari Universitas..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=' mb-5 md:w-[200px]'
          />
        </Col>
        <Col>
          <Input
            placeholder="Cari Negara..."
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            className=' mb-5 md:w-[200px]'

          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Cari
          </Button>
        </Col>
        <Col>
          <Button icon={<ClearOutlined />} onClick={handleClear}>
            Hapus Filter
          </Button>
        </Col>
        <Col>
          <Space>
            <Button icon={<FilterOutlined />} onClick={showModal}>
            More Filter
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="name" // Gunakan 'name' sebagai key untuk setiap baris
      />

      {/* Modal untuk filter */}
      <Modal
        title="Filter Universitas"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="clear" onClick={handleClear}>
            Hapus Filter
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Cari
          </Button>,
        ]}
      >
        <Input
          placeholder="Cari Universitas..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="Cari Negara..."
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
      </Modal>
    </div>
  )
}
