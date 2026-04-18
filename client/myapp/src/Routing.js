import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './InnerPages/Home'
import AddProduct from './InnerPages/AddProduct'
import DeleteProduct from './InnerPages/DeleteProduct'
import EditProduct from './InnerPages/EditProduct'
import ArmProducts from './InnerPages/ArmProducts'
import HamsaProducts from './InnerPages/HamsaProducts'
import EditHamsa from './InnerPages/EditHamsa'
import Signup from './InnerPages/Signup'
import Login from './InnerPages/Login'
import AdminDashboard from './InnerPages/AdminDashboard'
import ExcelUpload from './ExcelUpload'
import AllExcelUpload from './AllExcelUpload'
import AmazonData from './AmazonData'
import GetExceluploadData from './GetExceluploadData'
import ShopifyProducts from './InnerPages/ShopifyProducts'
import Customer from './InnerPages/Customer'

const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/deleteproduct' element={<DeleteProduct />} />
                <Route path='/editproduct/:id' element={<EditProduct />} />
                <Route path='/armproduct' element={<ArmProducts />} />
                <Route path='/hamsa' element={<HamsaProducts />} />
                <Route path='/edithamsa/:id' element={<EditHamsa />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                <Route path='/allupload' element={<AllExcelUpload />} />
                <Route path='/amazon' element={<AmazonData />} />
                <Route path='/shopify' element={<ShopifyProducts />} />
                <Route path='/customer' element={<Customer />} />

                <Route path='/admindashboard' element={<AdminDashboard />} >
                    <Route path='addproduct' element={<AddProduct />} />
                    <Route path='deleteproduct' element={<DeleteProduct />} />

                    <Route path='getexceldata' element={<GetExceluploadData />} />
                    <Route path='upload' element={<ExcelUpload />} />
                </Route>
            </Routes>
        </div>
    )
}

export default Routing