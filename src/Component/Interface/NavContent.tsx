import home from '../../assets/Home.svg'
import profile from '../../assets/Profile.svg'
import Dashboard from '../../assets/Dashboard.svg'
import ActivityHub from '../../assets/ActivityHub.svg'
import signOut from '../../assets/signOut.svg'
export const navLinks = [
    {
     id:1,
     title:'Home',
     navLink:'/home',
     logo:home
    },
    {
        id:2,
        title:'Profile',
        navLink:'/profile',
        logo:profile
       },
       {
        id:2,
        title:'Activity Hub',
        navLink:'/home',
        logo:ActivityHub
       },
       {
        id:3,
        title:'Dashboard',
        navLink:'/home',
        logo: Dashboard
       },
       {
        id:4,
        title:'Sign Out',
        navLink:'/',
        logo:signOut
       },
      
]
