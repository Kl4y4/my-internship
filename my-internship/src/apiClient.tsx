import { ApiClient, User } from './types/common'
 
const buildApiClient = (apiUrl: string | null) => {
  return {
    users: [
      { 
        email: "default.user@mail.com", 
        activity: 
          [
            { type: 'sitevisited', name: '/main', date: '2023-06-27T18:40:58.722Z' },
            { type: 'sitevisited', name: '/events', date: '2023-06-27T18:40:58.722Z' },
            { type: 'sitevisited', name: '/cart', date: '2023-06-27T18:40:58.722Z' },
            { type: 'sitevisited', name: '/main', date: new Date().toISOString() },
            { type: 'sitevisited', name: '/events', date: new Date().toISOString() },
            { type: 'productadded', name: 'WarsawJS', date: new Date().toISOString() },
            { type: 'productadded', name: 'Kult', date: new Date().toISOString() },
          ]
      }, 
      { 
        email: "tescior@testnik.com", 
        activity: 
          [
            { type: 'sitevisited', name: '/main', date: new Date().toISOString() },
            { type: 'sitevisited', name: '/categories', date: new Date().toISOString() },
          ] 
      },
      { 
        email: "tronk@ponk.pl", 
        activity: 
          [
            { type: 'sitevisited', name: '/main', date: new Date().toISOString() },
            { type: 'sitevisited', name: '/categories', date: new Date().toISOString() },
          ] 
      }
    ],
    currentUser: { 
      email: "default.user@mail.com", 
      activity: 
        [
          { type: 'sitevisited', name: '/main', date: '2023-06-27T18:40:58.722Z' },
          { type: 'sitevisited', name: '/events', date: '2023-06-27T18:40:58.722Z' },
          { type: 'sitevisited', name: '/cart', date: '2023-06-27T18:40:58.722Z' },
          { type: 'sitevisited', name: '/main', date: new Date().toISOString() },
          { type: 'sitevisited', name: '/events', date: new Date().toISOString() },
          { type: 'productadded', name: 'WarsawJS', date: new Date().toISOString() },
          { type: 'productadded', name: 'Kult', date: new Date().toISOString() },
        ]
    },
    getUsers() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ users: this.users, status: 200 })
        }, 100)
      })
    },
    addUser(email: string) {
      return new Promise((resolve, reject) => {
        if (email !== null) {
          this.users.push({ email, activity: []})
          resolve({ user: { email, activity: []}, status: 200 })
        } else {
          reject({status: 400})
        }
      })
    },
    getCurrentUser() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ user: this.currentUser, status: 200 })
        }, 100)
      })
    },
    setCurrentUser(user: User) {
      return new Promise((resolve, reject) => {
        this.currentUser = user
        resolve({status: 200})
      })
    },
    addUserActivity(email: string, newActivity: string, activityType: 'sitevisited' | 'productadded' | 'productdeleted' | 'cartcleared' | 'productsbought') {
      return new Promise((resolve, reject) => {
        if (email) {
          let userToChange = this.users.filter(el => el.email === email)
          userToChange[0].activity.push({ type: activityType, name: newActivity, date: new Date().toISOString() })
          this.users = this.users.map(el => el.email === email ? userToChange[0] : el)
          resolve({status: 200})
        } else {
          reject({status: 400})
        }
      })
    }
  }
}

const apiClient: ApiClient = buildApiClient('')
export default apiClient