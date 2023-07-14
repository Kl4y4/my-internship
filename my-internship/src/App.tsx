import { useRef } from "react";
import TicketApp from "./components/ticket-app_pages/TicketApp";
import HomePage from './components/ticket-app_pages/HomePage';
import Events from './components/ticket-app_pages/Events';
import Regions from './components/ticket-app_pages/Regions';
import Categories from './components/ticket-app_pages/Categories';
import Cart from './components/ticket-app_pages/Cart';
import Contact from './components/ticket-app_pages/Contact';
import { HashRouter, Routes, Route } from "react-router-dom";

function toggle(dialog: HTMLDialogElement | null) {
  if (dialog) {
    const op = dialog.getAttribute('open') !== null ? 'close' : 'show'
    dialog[op]()
  }
}

function App() {

  const ticketAppDialogRef = useRef<HTMLDialogElement>(null)

  return <>
    <div className="App">
      <div className="tiles">
        <button onClick={(/** @type {PointerEvent}*/ ev) => {
          toggle(ticketAppDialogRef.current)
        }}>Ticket app</button>
      </div>
      Hello world!
      <dialog ref={ticketAppDialogRef} open>
      <div id='ticket-app'>
        <HashRouter>
          <Routes>
            <Route path='' element={<TicketApp>
              <form className='close-dialog' method="dialog"><button type="submit">x</button></form>
              </TicketApp>}>
              <Route path='' element={<HomePage />} />
              <Route path='/events' element={<Events />} />
              <Route path='/regions' element={<Regions />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </dialog>
    </div>
  </>
}

export default App;
