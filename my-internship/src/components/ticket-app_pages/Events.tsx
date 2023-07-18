import { Button } from 'antd'
import { useOutletContext } from 'react-router'
import apiClient from '../../apiClient'

const Events = () => {

  const APIClient = apiClient

  const cartContext: any = useOutletContext()

  const addToCart = (eventName: string, price: number) => {
    let newId = cartContext.cart.length !== 0 ? cartContext.cart[cartContext.cart.length - 1].id + 1 : 0
    cartContext.setCart([...cartContext.cart, {
      id: newId,
      productName: eventName,
      price: price
    }])
    APIClient.addUserActivity(cartContext.currentUser.email, eventName, 'productadded')
    .catch((err: any) => console.log('No user logged in'))
  }

  return <>
    <div id="events">
      <ol>
        <li>Koncert zespołu Kult, Piotrków Trybunalski, 11. czerwca 2023 
          <Button onClick={() => addToCart('Kult', 80)}>Dodaj do koszyka</Button>
        </li>
        <li><span>Recital muzyki Chopina, Warszawa, Sala Koncertowa „Fryderyk”, ul. Podwale 15; 07.06.2023, 17:30</span>
          <Button onClick={() => addToCart('Chopin', 100)}>Dodaj do koszyka</Button>
        </li>
        <li><span>WarsawJS, Warszawa ul. Emilii Plater 53 (BEC), 14.06.2023 18:30</span>
          <Button onClick={() => addToCart('WarsawJS', 120)}>Dodaj do koszyka</Button>
        </li>
      </ol>
    </div>
  </>

}

export default Events