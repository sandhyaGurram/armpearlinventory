import React from 'react'

const ArmProducts = () => {
    return (
        <>
            <div >ArmProducts</div>
            <div className='col-6 mx-auto container p-5' >
                <h1 className='text-center'>ARM</h1>
                <form>
                    <input type='text' className='form-control mb-3' placeholder='Product Name' />
                    <input type='number' className='form-control mb-3' placeholder='Price' />
                    <input type='text' className='form-control mb-3' placeholder='Category' />
                    <input type='text' className='form-control mb-3' placeholder='Image' />
                    <input type='text' className='form-control mb-3' placeholder='Quantity' />
                    <input type='text' className='form-control mb-3' placeholder='Sku' />
                    <input type='submit' value='ADD ARM Product' />
                </form>
            </div>
        </>
    )
}

export default ArmProducts