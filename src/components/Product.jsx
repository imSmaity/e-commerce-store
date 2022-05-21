import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../App'
import Button from './Button'
import dots from '../assets/image/dots.png'
import edit from '../assets/image/edit.png'
import _delete from '../assets/image/delete.svg'
import Input from './Input'
import Select from './Select'
import './style/product.css'
import Model from '../Model/Model'
import axios from 'axios'

const Product = ({item}) => {
    const {products,setProducts}=useContext(ProductsContext)

    const [isDiscount,setIsDiscount]=useState(false);
    const [selectProducts,setSelectProducts]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [variantOpen,setVariantOpen]=useState(false);

    const {p,i}=item;

    
    useEffect(()=>{
        axios.get('https://stageapibc.monkcommerce.app/admin/shop/product')
        .then((res)=>{
            let modifyData=res.data
            modifyData=modifyData.map((pr)=>{
                pr.indeterminate=false;
                pr.isChecked=false;
                return {...pr,variants:pr.variants.map((v)=>{
                        return {...v,isChecked:false}
                    }
                )}
            })
            setSelectProducts(modifyData)
            setIsLoading(false)
        })
        .catch(err=>{
            console.error(err)
        })
    },[])

    const addProduct=(items)=>{
        if(items.length===0) items=[{id:'',title:'Select Product',discount:0,discountType:'',variants:[]}]
        setProducts([...items])
    }
  
    const deleteVariant=(variant)=>{
        const index=products.map(pi=>pi.id).indexOf(variant.product_id);
        const variantIndex=products[index].variants.map(vi=>vi.id).indexOf(variant.id);
        products[index].variants.splice(variantIndex,1);
        setProducts([...products])
    }

    return (
        
        <div className='row m-2'>
            <div className='col-1'>
                <img src={dots} alt="dot" id='dots'/>
                <span>{i+1}.</span>
            </div>
            <div className='col-5'>
                <div className='row' id='editProduct'>
                    <div className='col-10'>
                        <p>{p.title}</p>
                    </div>
                    <div className='col-2'>
                        <img src={edit} alt="edit" id='edit' data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>
                        <Model select={{selectProducts,setSelectProducts,isLoading,addProduct,setIsLoading}} />
                    </div>
                </div>
            </div>
            <div className='col-3'>
                {
                    !isDiscount?
                    <Button onclick={()=>setIsDiscount(true)}>Add Discount</Button>:
                    <>
                        <Input type='text' className='w-50'/>
                        <Select option={[{value:'%off',name:'% Off'},{value:'flat',name:'flat'}]}/>
                    </>
                }
            </div>
            {
                variantOpen?
                <>
                    <div className='col-12 text-end' onClick={()=>setVariantOpen(!variantOpen)}>Hide variants</div>
                    <div className='col-12'>
                        {
                            p.variants.map((v,i)=>{
                                return(
                                    <div className='row p-2' key={v.id}>
                                        <div className='col-1'></div>
                                        <div className='col-1'>
                                            <img src={dots} alt="dot" id='dots'/>
                                            <span>{i+1}.</span>
                                        </div>
                                        <div className='col-7 variant' >
                                            <p>{v.title}</p>
                                        </div>
                                        <div className='col-3'>
                                            <img src={_delete} style={{display:p.variants.length===1&&'none'}} alt="delete" onClick={()=>deleteVariant(v)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>:
                <div className='col-12 text-end' onClick={()=>setVariantOpen(!variantOpen)}>Show variants</div>
            }
        </div>
    )
}

export default Product