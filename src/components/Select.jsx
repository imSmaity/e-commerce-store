import React from 'react'
import Label from './Label';

const Select = ({option,label='',className}) => {
  return (
    <>
        <Label>{label}</Label>
        <select name="" id="" className={className}>
            {
                option.map((op,i)=>{
                    return <option value={op.value} key={i}>{op.name}</option>
                })
            }
        </select>
    </>
  )
}
export default Select;