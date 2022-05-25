
import { useState,createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Home from './pages/Home';

const ProductsContext=createContext()
const App=()=> {
  const [products,setProducts]=useState([{id:'DS',title:'Select Product',discount:0,discountType:'',variants:[]}])
  
  const handleDragAndDrop=(result)=>{
    const {source,destination,type}=result;
    if(destination===null) return;

    if(source.droppableId==="product"){ 
      [products[source.index],products[destination.index]]=[products[destination.index],products[source.index]]
    }
    else{
      const index=products.map(p=>p.id).indexOf(type);
      [products[index].variants[source.index],products[index].variants[destination.index]]=[products[index].variants[destination.index],products[index].variants[source.index]]
    }
    
    setProducts([...products])
  }
  return (
    <div className="App">
      <ProductsContext.Provider value={{products,setProducts}}>
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Home/>
        </DragDropContext>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;

export {ProductsContext}
