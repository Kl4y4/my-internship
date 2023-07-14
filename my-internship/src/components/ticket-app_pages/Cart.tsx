import { Button, Table } from 'antd'
import { useOutletContext } from 'react-router'
import { Product } from '../../types/common'
import { useRef } from 'react'

function toggle(dialog: HTMLDialogElement | null) {
  if (dialog) {
    const op = dialog.getAttribute('open') !== null ? 'close' : 'show'
    dialog[op]()
  }
}

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Produkt',
    dataIndex: 'productName',
    key: 'productName'
  },
  {
    title: 'Cena',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Akcje',
    dataIndex: 'actions',
    key: 'actions'
  },
]

const Cart = () => {
  
  const dialogRef = useRef<HTMLDialogElement>(null)
  const paymentInputRef = useRef<HTMLInputElement>(null)

  const cartContext: any = useOutletContext()

  const onDeleteProductClick = (product: Product) => {
    cartContext.deleteProduct(product)
    fetch('/api/users/addActivity')
    .catch((err: any) => console.log('No user is logged in'))
  }

  const buildRows = () => {
    return cartContext.cart.map((product: Product) => {
      return {
        key: product.id,
        id: product.id,
        productName: product.productName,
        price: product.price,
        actions: <Button onClick={() => onDeleteProductClick(product)}>Usuń</Button>
      }
    })
  }

  const cancelPayment = () => {
    cartContext.setCart([])
    fetch('/api/users/addActivity')
    .catch((err: any) => console.log('No user is logged in'))
  }

  const handlePayment = (e: any) => {
    if (paymentInputRef.current) {
      if (paymentInputRef.current.value.length < 6) {
        e.preventDefault()
        return
      }
      fetch('/api/users/addActivity')
      .catch((err: any) => console.log('No user is logged in'))
    }
  }

  return <>
    <div id="cart">
      <div>Oto twój koszyk</div>
      <div>
        <Table columns={columns} dataSource={buildRows()} />
      </div>
      <div>
        <label>
          <input type="checkbox"/> jakieś informacje prawne i oczywiście <a href="http://">zasady zamawiania</a>
        </label>
      </div>
      <div>
        <Button onClick={() => toggle(dialogRef.current)}>Przejdź do płatności</Button>
      </div>
    </div>
    <dialog ref={dialogRef}>
      <div style={{ backgroundColor: 'white', border: '1px solid black', padding: '20px' }}>
        Płatność screen
        <label>BLIK Code:
          <input type="text" inputMode="numeric" placeholder="123456" pattern="[0-9]+" ref={paymentInputRef} />
        </label>
        <div style={{ display: 'flex' }}>
          <form className='close-dialog' method="dialog"><button type="submit" onClick={cancelPayment}>Anuluj płatność</button></form>
          <form className='close-dialog' method="dialog"><button type="submit" onClick={handlePayment}>Kup</button></form>
        </div>
      </div>
    </dialog>
  </>
}

export default Cart