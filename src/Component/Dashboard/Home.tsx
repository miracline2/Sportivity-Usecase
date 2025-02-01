import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import Profile from './Profile';


const Home = () => {
    const location = useLocation();
    const renderCurrentSideNav = () => {
       
          switch (location.pathname) {
            case '/profile':
              return <Profile />;               
            default:
              return <Profile />;        
        }
       
      };
      useEffect(() => {
        window.scrollTo(0, 0); 
      }, [location.pathname]);
      return <div>{renderCurrentSideNav()}</div>;
}

export default Home