import { ReactNode, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { Product, User } from '../../types/common'
import { Button, Input } from 'antd'
import apiClient from '../../apiClient'

type TicketAppProps = {
  children: ReactNode
}

const TicketApp = ({ children }: TicketAppProps) => {

  const APIClient = apiClient
  const location = useLocation()

  const [email, setEmail] = useState<string | null>('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [cart, setCart] = useState<Array<Product>>(
    [
      { 
        id: 0, 
        productName: 'Kult',
        price: 70
      },
      {
        id: 1,
        productName: 'WarsawJS',
        price: 419
      }
    ]
  )

  const onLoginButtonClick = () => {

    setCart([])

    if (currentUser?.email === email) {
      alert("Inputted email is currently logged in")
    } else {
      APIClient.getUsers()
      .then((data: any) => {
        if (data.users) return data.users.filter((el: User) => el.email === email)
      })
      .then((userToLogin: any) => {
        if (userToLogin.length === 0) {
  
          APIClient.addUser(email || '')
          .then((data: any) => {
            data.user && APIClient.setCurrentUser(data.user)
          })
    
        } else {
  
          APIClient.setCurrentUser(userToLogin[0])
          setCurrentUser(userToLogin[0])
        
        }
      })
    }
  }

  const deleteProduct = (product: Product) => {
    let indexToDelete = cart.indexOf(product)
    let newCart = cart.toSpliced(indexToDelete, 1)
    setCart(newCart)
  }

  useEffect(() => {
    APIClient.getCurrentUser()
    .then((data: any) => {
      if (data.user) {
        setCurrentUser(data.user)
        APIClient.addUserActivity(data.user.email, location.pathname === '/' ? '/main' : location.pathname, 'sitevisited')
      }
    })

  }, [location])

  return <>
    {children}
    <h1>Kup mi taki a taki bilet</h1>
    <div>
      <Input type="email" placeholder="Enter your email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button type="primary" onClick={onLoginButtonClick}>Zaloguj</Button>
        <Button onClick={() => {
          APIClient.setCurrentUser(null)
          setCart([])
        }}>Wyloguj</Button>
      </div> 
    </div>
    <Navbar />
    <Outlet context={{ cart, setCart, deleteProduct, currentUser }} />
    <footer>&copy;left 2023</footer>
  </>
}

export default TicketApp