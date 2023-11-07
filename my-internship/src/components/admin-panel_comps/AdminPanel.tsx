import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { Alert, Button, Collapse, ConfigProvider } from 'antd'
import adminPanelProps from './adminPanelProps'
import { ReactNode, useEffect, useState } from 'react'
import ContactsTable from './ContactsTable'
import { User } from '../../types/common'
import UserActivityList from './UserActivityList'
import apiClient from '../../apiClient'

type AdminPanelProps = {
  children: ReactNode,
  isOpen: boolean
}


const menuItemRenderFun = (setPathname: Function) => {
  return (item: any, dom: any) => (
    <div
      onClick={() => {
        setPathname(item.path || '/');
      }}
    >
      {dom}
    </div>
  );
}

const convertGroupsToArray = (groups: any) => {

  const groupsArray = Object.keys(groups).map((el, ind) => {

    return {
      key: ind,
      label: `Activity on ${el}`,
      children: <UserActivityList group={groups[el]} />
    };

  }).reverse();

  groupsArray.push({
    key: groupsArray.length,
    label: `Contact created on ${new Date().toISOString().split('T')[0]}`,
    children: <div>Full date: {new Date().toISOString().replace('T', ' ').split('.')[0]}</div>
  });

  return groupsArray;

}

const createCollapseGroups = (user: User) => {

  if (!user) return []

  let groups = user.activity.reduce((groupped: any, activity) => {
    
    let date = activity.date.split('T')[0]
    if (!groupped[date]) {
      groupped[date] = []
    }

    groupped[date].push(activity)

    return groupped

  }, {})

  const groupsArray = convertGroupsToArray(groups);

  return groupsArray

}

const AdminPanel = ({ children, isOpen }: AdminPanelProps) => {

  const APIClient = apiClient

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<Array<User> | null>(null)
  const [pathname, setPathname] = useState<string>('/')

  useEffect(() => {
    !isOpen && setSelectedUser(null)
  }, [isOpen])

  useEffect(() => {
    APIClient.getUsers()
    .then((data: any) => setUsers(data.users))
    
    APIClient.getCurrentUser()
    .then((response: any) => setCurrentUser(response.user))
  })

  return <>
    <div style={{ zIndex: 1001, position: 'absolute' }}>
      {children}
    </div>
    <ProConfigProvider hashed={false}>
      <ConfigProvider getTargetContainer={() => document.getElementById('admin-panel') || document.body}>
        <ProLayout route={adminPanelProps.route}
          title='Ticket app'
          layout='mix'
          splitMenus
          menu={{
            collapsedShowGroupTitle: true,
          }}
          siderMenuType='group'
          menuItemRender={menuItemRenderFun(setPathname)}
          location={{pathname}}
        >
          <PageContainer content={
            selectedUser?.email !== currentUser?.email && selectedUser !== null
            ? <Alert message="This user is not currently signed in." type="warning" />
            : <></>
          }>
            <div>
              { selectedUser === null
              ? <ContactsTable users={users} setSelectedUser={setSelectedUser} />
              : <>
                <Button style={{ marginBottom: '10px' }} onClick={() => setSelectedUser(null)}>Back</Button>
                <Collapse accordion items={createCollapseGroups(selectedUser)} />
              </>}
            </div>
          </PageContainer>
        </ProLayout>
      </ConfigProvider>
    </ProConfigProvider>
  </>
}

export default AdminPanel