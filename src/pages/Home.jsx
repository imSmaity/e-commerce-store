import React, { useContext } from 'react'
import { ProductsContext } from '../App'
import Button from '../components/Button'
import Product from '../components/Product'

const AddProducts=()=>{
    const {products,setProducts}=useContext(ProductsContext)

    const addNewProduct=()=>{
        setProducts([...products,{id:'',title:'Select Product',discount:0,discountType:'',variants:[]}])
    }
    return (
        <div className='row'>
            <div className="col-12">
                <h5>Add Products</h5>
            </div>
            <div className="col-6">
                <h6>Product</h6>
            </div>
            <div className="col-6">
                <h6>Discount</h6>
            </div>
            <div className='col-12'>
                {
                    products.map((p,i)=>{
                        return(
                            <Product item={{p,i}} key={i}/>
                        )
                    })
                }
            </div>
            <div>
                <Button onclick={addNewProduct}>Add Product</Button>
            </div>
        </div>
    )
}

const Home=()=> {
  return (
    <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
            <AddProducts/>
        </div>
        <div className='col-md-2'></div>
    </div>
  )
}

export default Home