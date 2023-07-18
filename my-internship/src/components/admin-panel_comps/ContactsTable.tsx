import { Button } from 'antd'
import { User } from '../../types/common'
import Table, { ColumnsType } from 'antd/es/table'
import { AnyObject } from 'antd/es/_util/type'

type ContactsTableProps = {
  users: Array<User> | null,
  setSelectedUser: Function
}

const columns: ColumnsType<AnyObject> = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions'
  }
]

const ContactsTable = ({ users, setSelectedUser }: ContactsTableProps) => {
  
  const buildRows = () => {
    return users?.map((user: User, ind) => {
      return {
        key: ind,
        email: user.email,
        actions: <Button onClick={() => setSelectedUser(user)}>Activity</Button>
      }
    })
  }

  return <>
    <Table dataSource={buildRows()} columns={columns} />
  </>
}

export default ContactsTable