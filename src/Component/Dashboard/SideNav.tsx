// import React from 'react'

import { navLinks } from "../Interface/NavContent"
import line from '../../assets/Line.svg'

const SideNav = () => {
    return (
        <div className="container-fluid  ">
        <div className="row">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 fixed sideNav">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <div className="d-flex justify-content-center" >
                {/* <input type="file" /> */}
                <img className="profile-pic" src="https://themarketingcrowd.ie/wp-content/uploads/2017/01/Round-Profile-Pic.png" alt="" />
              </div>
            <div className="d-flex align-items-center mt-4">
              <img src={line} alt="" />
            </div>
              <hr className='bg-white' />
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                {navLinks.map((nav:any, index:any)=>(
                    <li  key={index} className="nav-item ">
                        <a href={nav.navLink} className="nav-link align-middle text-decoration-none d-flex mt-3 gap-3">
                            <img src={nav.logo} alt="" />
                            <span className="navHeading">{nav.title}</span>

                        </a>
                    </li>
                ))}
              </ul>
              <hr/>      
            </div>
          </div>
        </div>
      </div>
      )
}

export default SideNav