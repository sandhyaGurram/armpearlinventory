import axios from 'axios'
import { NavLink, Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'


const AdminDashboard = () => {

    return (
        <>

            <div className='container-fluid'>
                <h1 className=' text-center py-5'>Admin Dashboard</h1>

                <div className='row'>
                    <div className='col-md-3 '>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 container'>
                        <Outlet />
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminDashboard