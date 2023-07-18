import { SmileFilled } from '@ant-design/icons'

type RoutesType = {
  category: string,
  subroutes?: string[]
}

const routes: Array<RoutesType> = [
  { category: 'Contacts',
    subroutes: [
      'Contacts',
      'Companies',
      'Calls',
      'Target accounts',
      'Activity feed',
      'Lists',
  ]},
  { category: 'Conversations',
    subroutes: [
      'Inbox',
      'Chatflows',
      'Snippets',
      'Templates',
  ]},
  { category: 'Marketing',
    subroutes: [
      'Ads',
      'Email',
      'Landing page',
      '...',
  ]},
  { category: 'Sales'},
  { category: 'Service'},
  { category: 'Automation'},
  { category: 'Reports'},
]

const routerConfig = {
  route: {
    path: '/',
    routes: [
      ...routes.map(({ category, subroutes }) => ({
        path: '/'+category,
        name: category,
        icon: <SmileFilled />,
        component: './Welcome',
        routes: (subroutes || []).map((e: string) => ({
          path: '/'+e,
          name: e,
          icon: <SmileFilled />,
          component: './Welcome',
        })),
      })),
    ]
  }
}

export default routerConfig