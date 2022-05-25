import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Search from '../components/Search'
import { AllItem } from './AllItem'




const Model = ({select}) => {
    const {selectProducts,setSelectProducts,isLoading,addProduct,setIsLoading}=select;
    const [selectedItems,setSelectedItems]=useState([])
    

    useEffect(()=>{
        const products=selectProducts
        const newdata=products.map(p=>{
            const index=selectedItems.map(o=>o.id).indexOf(p.id)
            let count=0;
            if(index!==-1){
                const variants=p.variants.map(v=>{
                    const variantIndex=selectedItems[index].variants.map(vi=>vi.id).indexOf(v.id)
                    if(variantIndex===-1) return {...v,isChecked:false};
                    else  {
                        count+=1;
                        if(count===p.variants.length) p.isChecked=true;
                        else p.isChecked=false;
                        return {...v,isChecked:true}
                    }
                })
                return {...p,variants};
            }
            else{
                const variants= p.variants.map(v=>{
                    return {...v,isChecked:false}
                })
                return {...p,isChecked:false,variants};
            } 
        })
        setSelectProducts([...newdata])
    },[selectedItems,setSelectProducts])
    
    const handleItem=(item)=>{
        const index=selectedItems.map(o=>o.id).indexOf(item.id)
        if(index===-1){
            setSelectedItems([...selectedItems,item])
        }
        else{
            selectedItems.splice(index,1)
            setSelectedItems([...selectedItems])
        }
    }

    const handleVariant=(item,variant)=>{
        
        const index=selectedItems.map(o=>o.id).indexOf(variant.product_id)
        if(index===-1){
            setSelectedItems([...selectedItems,{...item,variants:[variant]}])
        }
        else{
            const variantIndex=selectedItems[index].variants.map(v=>v.id).indexOf(variant.id)
            if(variantIndex===-1){
                selectedItems[index].variants.push(variant)
                setSelectedItems([...selectedItems])
            }
            else{
                selectedItems[index].variants.splice(variantIndex,1)
                if(selectedItems[index].variants.length===0){
                    selectedItems.splice(index,1)
                }
                setSelectedItems([...selectedItems])
            }
        }
    }

    return (

        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Select Products</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Search setSearch={{setSelectProducts,setIsLoading}}/>
                    {
                        !isLoading?
                        <div className='row'>
                            {
                                selectProducts.map((item,i)=>{
                                    return( 
                                        <AllItem 
                                            item={item} 
                                            index={i}
                                            key={item.id} 
                                            handleItem={handleItem} 
                                            handleVariant={handleVariant}
                                        />
                                    );
                                })
                            }
                        </div>:
                        <div><Loading/></div>
                    }
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>addProduct(selectedItems)}>Add</button>
                </div>
                </div>
            </div>
        </div>
)
}

export default Model