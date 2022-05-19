import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Loading from './Loading'


const isCheckedAll=(modifyData,index,check)=>{
    modifyData[index]={...modifyData[index],variants:modifyData[index].variants.map((v)=>{
        return {...v,isChecked:check}
    })} 

    return [...modifyData];
}
const isChecked=(modifyData,index,pIndex,check)=>{
    modifyData[pIndex].variants[index].isChecked=check;

    return [...modifyData];
}

const Variant=({variant,handleVariant,index,pIndex})=>{
    
    return(
        <div className='row'>
            <div className="col-1">
                <Input 
                    type='checkbox' 
                    name={'variant'} 
                    checked={variant.isChecked} 
                    onChange={(e)=>handleVariant(e,variant.id,index,pIndex)}
                />
            </div>
            <div className='col-7'>
                <div>{variant.title}</div>
            </div>
            <div className="col-2"></div>
            <div className="col-2">${variant.price}</div>
        </div>
    )
}
const AllItem = ({item,handleItem,handleVariant,index}) => {
    const check=useRef()
    useEffect(()=>{
        check.current.indeterminate=item.indeterminate
        // let count=0;
        // for(let i=0;i<item.variants.length;i++){
        //     if(item.variants[i].isChecked){
        //         count+=1;
        //     }
        // }
        // if(count>=item.variants.length){
        //     check.current.indeterminate=false
        //     check.current.checked=true
        // }
        // else{
        //     check.current.checked=false
        //     check.current.indeterminate=item.indeterminate
        // }
    },[item.indeterminate])
 
  return (
    <>
        <div className='col-12'>
            <div className='row'>
                <div className='col-1'>
                    <input
                        type='checkbox'
                        ref={check}
                        onChange={(e)=>handleItem(e,item,index)}
                    />
                </div>
                <div className='col-1'><img src={item.images[0].src}  id='p-img' alt="..." /></div>
                <div className='col-10'>{item.title}</div>
            </div>
        </div>
        <div className='col-1'></div>
        <div className='col-11'>
            {
                item.variants.map((variant,i)=>{
                    return <Variant variant={variant} key={variant.id} index={i} pIndex={index} handleVariant={handleVariant}/>;
                    
                })
            }
            
        </div>
    </>
  )
}

const Model = ({select}) => {
    const {selectProducts,setSelectProducts,isLoading}=select;
    const [selectItems,setSelectItems]=useState([])

    const handleItem=(e,item,index)=>{
  
        if(e.target.checked)
        {
            setSelectItems([...selectItems,item])
            setSelectProducts(isCheckedAll(selectProducts,index,true))
        }
        else{
            setSelectItems([...selectItems.filter((p)=>p.id!==item.id)])
            setSelectProducts(isCheckedAll(selectProducts,index,false))
        }

    }
    console.log(selectItems);
    const handleVariant=(e,i,index,pIndex)=>{
        let check=-1;
        if(e.target.checked){
            setSelectProducts(isChecked(selectProducts,index,pIndex,true))
            for(let i=0;i<selectItems.length;i++){
                if(selectItems[i].id===selectProducts[pIndex].id){
                    check=i
                }
            }
            /*if(check!==-1){
                selectItems[check].variants.push(selectProducts[pIndex].variants[index])
                setSelectItems([...selectItems,selectItems])
            }
            else{
                const variant=[selectProducts[pIndex].variants[index]]
                setSelectItems([...selectItems,{...selectProducts[pIndex],variants:variant}])
            }*/
        }
        else{
            setSelectProducts(isChecked(selectProducts,index,pIndex,false))
        }
        let count=0;
        for(let i=0;i<selectProducts[pIndex].variants.length;i++){
            if(selectProducts[pIndex].variants[i].isChecked){
                count++;
                selectProducts[pIndex].indeterminate=true;
            }
        }
        if(selectProducts[pIndex].variants.length-1===count||count===0){
            selectProducts[pIndex].indeterminate=false;
        }
        setSelectProducts([...selectProducts])
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
                    <Input type='search' className='w-100'/>
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
                    <button type="button" className="btn btn-primary">Add</button>
                </div>
                </div>
            </div>
        </div>
)
}

export default Model