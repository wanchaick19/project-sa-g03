import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { GetLocks, UpdateLockStatus, DeleteLockByID } from '../../services/https/index';
import EditLock from '../EditLock/EditLock';
import { Lock } from '../../interfaces/ILock';
import './locksDataStyle.css';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const LocksData: React.FC = () => {
  const [locks, setLocks] = useState<Lock[]>([]);
  const [filteredLocks, setFilteredLocks] = useState<Lock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedLock, setSelectedLock] = useState<Lock | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');

  const fetchLocks = async () => {
    setLoading(true);
    try {
      const res = await GetLocks();
      if (res) {
        setLocks(res);
        setFilteredLocks(res);
      } else {
        setError('ไม่พบข้อมูล');
      }
    } catch (error) {
      setError('ล้มเหลวในการดึงข้อมูล');
      console.error('ล้มเหลวในการดึงข้อมูล', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchLocks();
    setIsModalVisible(false);
  };

  const onDeleteLock = (id: string | undefined) => {
    if (!id) return;

    Modal.confirm({
      title: 'คุณต้องการที่จะลบล็อคใช่หรือไม่',
      content: 'การลบสามารถยกเลิกได้',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const success = await DeleteLockByID(id);
          if (success) {
            message.success('ลบล็อคสำเร็จ');
            fetchLocks();
          } else {
            message.error('ลบล็อคล้มเหลว');
          }
        } catch (error) {
          message.error('ลบล็อคล้มเหลว');
          console.error('ลบล็อคล้มเหลว', error);
        }
      },
    });
  };

  const showEditModal = (lock: Lock) => {
    setSelectedLock(lock);
    setIsModalVisible(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    filterLocks(e.target.value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    filterLocks(searchText, value);
  };

  const filterLocks = (search: string, status?: string) => {
    let filtered = locks.filter(lock =>
      lock.Id.toLowerCase().includes(search.toLowerCase()) ||
      lock.Size.toLowerCase().includes(search.toLowerCase())
    );
    if (status) {
      filtered = filtered.filter(lock => lock.Status === status);
    }
    setFilteredLocks(filtered);
  };

  const handleStatusChange = async (value: string, lock: Lock) => {
    try {
      const success = await UpdateLockStatus(lock.Id, value);
      if (success) {
        message.success('Status updated successfully');
        fetchLocks();
      } else {
        message.error('Failed to update status');
      }
    } catch (error) {
      message.error('Error updating status');
      console.error('Error updating status:', error);
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'ว่าง':
        return 'status-available';
      case 'ไม่ว่าง':
        return 'status-unavailable';
      case 'ไม่พร้อมใช้งาน':
        return 'status-not-ready';
      default:
        return '';
    }
  };

  useEffect(() => {
    fetchLocks();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
      width: 260,
      align: 'center',
      sorter: (a: Lock, b: Lock) => a.Id.localeCompare(b.Id),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: 290,
      align: 'center',
      render: (status: string, lock: Lock) => (
        <div className="status">
          <div className={`status-color ${getStatusColorClass(status)}`}></div>
          <Select
            value={status}
            onChange={(value) => handleStatusChange(value, lock)}
            style={{ width: 150 }}
          >
            <Option value="ว่าง">ว่าง</Option>
            <Option value="ไม่ว่าง">ไม่ว่าง</Option>
            <Option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</Option>
          </Select>
        </div>
      ),
      sorter: (a: Lock, b: Lock) => a.Status.localeCompare(b.Status),
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      width: 290,
      align: 'center',
      sorter: (a: Lock, b: Lock) => a.Price - b.Price,
    },
    {
      title: 'Size',
      dataIndex: 'Size',
      key: 'Size',
      width: 230,
      align: 'center',
      sorter: (a: Lock, b: Lock) => a.Size.localeCompare(b.Size),
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, record: Lock) => (
        <div className="action-icons">
          <EditOutlined onClick={() => showEditModal(record)} style={{ marginRight: 8, cursor: 'pointer' }} />
          <DeleteOutlined onClick={() => onDeleteLock(record.Id)} style={{ color: 'red', cursor: 'pointer' }} />
        </div>
      ),
      width: 260,
      align: 'center',
    },
  ];

  return (
    <div className='lock-data'>
      <div className='filter'>
        <Input
          
          placeholder="Search by ID or Size"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: 250, marginRight: 20 }}
        />
        <Select
          placeholder="Filter by Status"
          onChange={handleStatusFilter}
          style={{ width: 200 }}
        >
          <Option value="">All</Option>
          <Option value="ว่าง">ว่าง</Option>
          <Option value="ไม่ว่าง">ไม่ว่าง</Option>
          <Option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredLocks}
        rowKey="Id"
        loading={loading}
        pagination={{
          pageSize: 6,
          hideOnSinglePage: true,
          itemRender: (current, type, originalElement) => {
            if (type === 'prev') {
              return <a>Previous</a>;
            }
            if (type === 'next') {
              return <a>Next</a>;
            }
            return originalElement;
          }
        }}
      />

      <Modal
        title="Edit Lock"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={400}
      >
        {selectedLock && <EditLock lock={selectedLock} onUpdate={handleUpdate} />}
      </Modal>
    </div>
  );
};

export default LocksData;