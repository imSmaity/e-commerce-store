import React, { useContext } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ProductsContext } from '../App'
import Button from '../components/Button'
import Product from '../components/Product'
import './home.css'

const AddProducts=()=>{
    const {products,setProducts}=useContext(ProductsContext)

    const addNewProduct=()=>{
        setProducts([...products,{id:'DS'+(products.length).toString(),title:'Select Product',discount:0,discountType:'',variants:[]}])
    }
    return (
        <div className='row'>
            <div className="col-12">
                <h5>Add Products</h5>
            </div>
            <div className="col-6 text-center">
                <h6>Product</h6>
            </div>
            <div className="col-6">
                <h6 style={{marginLeft:'8rem'}}>Discount</h6>
            </div>
            <Droppable type='outer' droppableId='product'>
                {
                    (provided)=>(
                        <div 
                            className='col-12'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                        {
                            products.map((p,i)=>{
                                return(
                                    <Product item={{p,i}} key={p.id}/>
                                )
                            })
                        }
                        {provided.placeholder}
                        </div>
                    )
                }
            
            </Droppable>
            <div className='col-9 p-2'>
                <Button onClick={addNewProduct} id='add-p'>Add Product</Button>
            </div>
        </div>
    )
}

const Home=()=> {
  return (
    <div className='row'>
        <div className='col-12' id='h-ts'>
            <h6>Monk Upsell & Cross-sell</h6>
        </div>
        <div className='col-md-2'></div>
        <div className='col-md-10 mt-5'>
            <AddProducts/>
        </div>
    </div>
  )
}

export default Home