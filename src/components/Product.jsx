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
import { Draggable, Droppable } from 'react-beautiful-dnd'

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
                pr.id=(pr.id).toString();

                return {...pr,variants:pr.variants.map((v)=>{
                        return {...v,id:(v.id).toString(),product_id:(v.product_id).toString(),isChecked:false}
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
        if(items.length===0) items=[{id:'DS',title:'Select Product',discount:0,discountType:'',variants:[]}]
        setProducts([...items])
    }
  
    const deleteVariant=(variant)=>{
        const index=products.map(pi=>pi.id).indexOf(variant.product_id);
        const variantIndex=products[index].variants.map(vi=>vi.id).indexOf(variant.id);
        products[index].variants.splice(variantIndex,1);
        setProducts([...products])
    }

    const deleteProduct=(product)=>{
        const newProducts=products.filter(pf=>pf.id!==product.id)
        setProducts([...newProducts])
    }
    return (
    <Draggable draggableId={p.id} index={i}>
        {
            (provided)=>(
            <div 
                className='row m-2'
                {...provided.draggableProps}
                
                ref={provided.innerRef}
            >
                <div className='col-1'>
                    <img src={dots} alt="dot" id='dots' {...provided.dragHandleProps}/>
                    <span>{i+1}.</span>
                </div>
                <div className='col-6'>
                    <div className='row' id='editProduct'>
                        <div className='col-12'>
                            <div className='row shadow-sm' id='p-title'>
                                <div className='col-10'>
                                    <p>{p.title}</p>
                                </div>
                                <div className='col-2' id='edit-dot'>
                                    <img src={edit} alt="edit" id='edit' data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>
                                    <Model select={{selectProducts,setSelectProducts,isLoading,addProduct,setIsLoading}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    {
                        !isDiscount?
                        <Button onClick={()=>setIsDiscount(true)} id='add-d'>Add Discount</Button>:
                        <>
                            <Input type='text' className='shadow-sm w-50 in'/>
                            <Select className='shadow-sm flat' option={[{value:'%off',name:'% Off'},{value:'flat off',name:'flat off'}]}/>
                        </>
                    }
                    <img src={_delete} style={{display:products.length===1&&'none'}} alt="delete" className='ms-3' onClick={()=>deleteProduct(p)}/>
                </div>

                {
                    variantOpen?
                    <>
                        <div className='col-9 text-end' onClick={()=>setVariantOpen(!variantOpen)} style={{display:p.variants.length===0&&'none'}}>Hide variants</div>
                        <Droppable type={p.id} droppableId={`droppable${p.id}`}>
                            {
                                (provided)=>(
                                
                                    <div 
                                        className='col-12'
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            p.variants.map((v,i)=>{
                                                return(
                                                    <Draggable key={`${v.product_id}${i}`} draggableId={`${v.product_id}${i}`} index={i}>
                                                        {
                                                            (provided)=>(
                                                                <div 
                                                                    className='row p-2'
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    <div className='col-1'></div>
                                                                    <div className='col-1'>
                                                                        <img src={dots} alt="dot" id='dots' {...provided.dragHandleProps}/>
                                                                        <span>{i+1}.</span>
                                                                    </div>
                                                                    <div className='col-6 variant shadow-sm' >
                                                                        <p>{v.title}</p>
                                                                    </div>
                                                                    <div className='col-3'>
                                                                        <img src={_delete} style={{display:p.variants.length===1&&'none'}} alt="delete" onClick={()=>deleteVariant(v)}/>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    
                                                    </Draggable>
                                                )
                                            })
                                        }
                                        {provided.placeholder}
                                    </div>
                                )   
                            }
                        </Droppable>
                    </>:
                    <div className='col-9 text-end' onClick={()=>setVariantOpen(!variantOpen)} style={{display:p.variants.length===0&&'none'}}>Show variants</div>
                }
            </div>
        )}
    </Draggable>
    )
}

export default Product