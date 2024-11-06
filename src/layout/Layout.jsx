
import { Outlet } from 'react-router-dom'
import SidebarRender from './SidebarRender'
import FCM from '../firebase/FCM'

const Layout = () => {
  return (
    <div className=' h-100 d-flex flex-column flex-lg-row'>
      <SidebarRender />
      <FCM />
      <Outlet />
    </div>
  )
}

export default Layout