import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../App'
import Button from './Button'
import dots from '../assets/image/dots.png'
import edit from '../assets/image/edit.png'
import Input from './Input'
import Select from './Select'
import './style/product.css'
import Model from './Model'
import axios from 'axios'

const Product = ({item}) => {
    const {products,setProducts}=useContext(ProductsContext);
    const [isDiscount,setIsDiscount]=useState(false);
    const [selectProducts,setSelectProducts]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    const {p,i}=item;

    useEffect(()=>{
        axios.get('https://stageapibc.monkcommerce.app/admin/shop/product')
        .then((res)=>{
            setSelectProducts(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.error(err)
        })
    },[])
   
    return (
        
        <div className='row'>
            <div className='col-2'>
                <img src={dots} alt="dot" id='dots'/>
                <span>{i+1}.</span>
            </div>
            <div className='col-4'>
                <div className='row' id='editProduct'>
                    <div className='col-10'>
                        <p>Name</p>
                    </div>
                    <div className='col-2'>
                        <img src={edit} alt="edit" id='edit' data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>
                        <Model select={{selectProducts,isLoading}}/>
                    </div>
                </div>
            </div>
            <div className='col-4'>
                {
                    !isDiscount?
                    <Button onclick={()=>setIsDiscount(true)}>Add Discount</Button>:
                    <>
                        <Input type='text' className='w-50'/>
                        <Select option={[{value:'%off',name:'% Off'},{value:'flat',name:'flat'}]}/>
                    </>
                }
            </div>
        </div>
    )
}

export default Product