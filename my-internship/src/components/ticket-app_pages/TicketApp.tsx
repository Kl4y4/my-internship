import { ReactNode, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { Product, User } from '../../types/common'
import { Button, Input } from 'antd'

type TicketAppProps = {
  children: ReactNode
}

const TicketApp = ({ children }: TicketAppProps) => {

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
      fetch('/api/users')
      .then((data: any) => {
        if (data.users) return data.users.filter((el: User) => el.email === email)
      })
      .then((userToLogin: any) => {
        if (userToLogin.length === 0) {
  
          fetch('/api/users/addUser')
          .then((data: any) => {
            data.user && fetch('/api/users/setUser')
          })
    
        } else {
  
          fetch('/api/users/setUser')
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
    fetch('/api/users/getCurrentUser')
    .then((data: any) => {
      if (data.user) {
        setCurrentUser(data.user)
        fetch('/api/users/addActivity')
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
          fetch('/api/users/setUser')
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