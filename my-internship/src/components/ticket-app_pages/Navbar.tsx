import { Link } from 'react-router-dom'
import { Button } from 'antd'

const Navbar = () => {
  return <>
    <Link to=''><Button>Str. główna</Button></Link>
    <Link to='/events'><Button>events</Button></Link>
    <Link to='/regions'><Button>regions</Button></Link>
    <Link to='/categories'><Button>categories</Button></Link>
    <Link to='/cart'><Button>cart</Button></Link>
    <Link to='/contact'><Button>contact</Button></Link>
  </>
}

export default Navbar