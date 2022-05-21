import { Variant } from './Variant'


export const AllItem = ({item,handleItem,handleVariant,index}) => {

  return (
    <>
        <div className='col-12'>
            <div className='row' onClick={()=>handleItem(item)}>
                <div className='col-1'>
                    <input
                        type='checkbox'
                        // ref={check}
                        checked={item.isChecked}
                        onChange={e=>{}}
                    />
                </div>
                <div className='col-1'><img src={item.image.src}  id='p-img' alt="..." /></div>
                <div className='col-10'>{item.title}</div>
            </div>
        </div>
        <div className='col-1'></div>
        <div className='col-11'>
            {
                item.variants.map((variant,i)=>{
                    return <Variant variant={variant} key={variant.id} item={item} index={i} pIndex={index} handleVariant={handleVariant}/>;
                    
                })
            }
            
        </div>
    </>
  )
}