export const isCheckedAll=(modifyData,index,check)=>{
    modifyData[index]={...modifyData[index],variants:modifyData[index].variants.map((v)=>{
        return {...v,isChecked:check}
    })} 

    return [...modifyData];
}