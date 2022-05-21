import Input from "../components/Input"

export const Variant=({item,variant,handleVariant,index,pIndex})=>{
    
    return(
        <div className='row variants'  onClick={()=>handleVariant(item,variant)}>
            <div className="col-1">
                <Input 
                    type='checkbox' 
                    name={'variant'} 
                    checked={variant.isChecked}
                    onChange={(e)=>e.target.checked=variant.isChecked}
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
