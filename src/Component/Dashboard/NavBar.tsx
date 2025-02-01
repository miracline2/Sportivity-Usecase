import logo from '../../assets/logo.svg'
import '../CSS/Navbar.css'
import SideNav from './SideNav'

const NavBar = () => {
  return (
    <>
    <div className='d-flex flex-row gap-2 navBar '>
      <div className='navbar-logo'>
        <img src={logo} className='navbar-logo' alt="" />
      </div>
      <div className='mt-3 logo-text'>
      SPORTYVITY
      </div>
    </div>
    <div className=' '>
    <SideNav/>
  </div>
    
    </>
  )
}

export default NavBar