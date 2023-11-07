import { useRef, useState } from "react";
import TicketApp from "./components/ticket-app_pages/TicketApp";
import HomePage from './components/ticket-app_pages/HomePage';
import Events from './components/ticket-app_pages/Events';
import Regions from './components/ticket-app_pages/Regions';
import Categories from './components/ticket-app_pages/Categories';
import Cart from './components/ticket-app_pages/Cart';
import Contact from './components/ticket-app_pages/Contact';
import { HashRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/admin-panel_comps/AdminPanel";

function toggle(dialog: HTMLDialogElement | null) {
  if (dialog) {
    const op = dialog.getAttribute('open') !== null ? 'close' : 'show'
    dialog[op]()
  }
}

function App() {

  const ticketAppDialogRef = useRef<HTMLDialogElement>(null)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false)

  return <>
    <div className="App" data-testid="app">
      <div className="tiles">
        <button onClick={(/** @type {PointerEvent}*/ ev) => {
          toggle(ticketAppDialogRef.current)
        }}>Ticket app</button>
        <button onClick={(ev) => {
          toggle(document.querySelector('dialog#admin-panel-dialog'))
          setIsAdminPanelOpen(true)
        }}>Admin panel</button>
      </div>
      <dialog id='admin-panel-dialog' data-testid='admin-panel-dialog'>
        <div id='admin-panel-container'>
          <AdminPanel isOpen={isAdminPanelOpen}>
            <form onSubmit={() => setIsAdminPanelOpen(false)} className='close-dialog' method="dialog"><button type="submit">x</button></form>
          </AdminPanel>
        </div>
      </dialog>
      <dialog ref={ticketAppDialogRef}>
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
