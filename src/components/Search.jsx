import axios from 'axios'
import React from 'react'
import Input from './Input'
import _ from 'lodash'

const Search = ({setSearch}) => {
    const {setSelectProducts,setIsLoading}=setSearch;

    const fetchData=(wo='po')=>{
        setIsLoading(true)
        axios.get(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${wo}&page=1`)
        .then((res)=>{
            let modifyData=res.data?res.data:[]
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
    }

    const searching=(e)=>{
        fetchData(e.target.value)
    }

    return <Input type='search' className='w-100 p-2 mb-3' onChange={(e)=>{
        searching(e)
        }
    }/>
}

export default Search