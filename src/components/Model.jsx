import React from 'react'
import Input from './Input'
import Loading from './Loading'


const AllItem = () => {
  return (
    <>
        <div className='col-12'>
            <div className='col-2'><Input type='checkbox'/></div>
            <div className='2'></div>
            <div className='col-8'></div>
        </div>
        <div className='col-1'></div>
        <div className='col-11'>
            <div className='row'>
                <div className="col-2">
                    <Input type='checkbox'/>
                </div>
                <div className='col-6'>

                </div>
                <div className="col-2"></div>
                <div className="col-2"></div>
            </div>
        </div>
    </>
  )
}

const Model = ({selectProducts,isLoading}) => {
    return (

        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
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
                            <AllItem/>
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