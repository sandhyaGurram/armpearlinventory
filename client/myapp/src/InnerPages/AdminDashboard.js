import axios from 'axios'
import { NavLink, Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'


const AdminDashboard = () => {

    return (
        <>
            <h1 className='text-center'>Admin Dashboard</h1>
            <div className='container-fluid'>

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