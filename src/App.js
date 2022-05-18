
import { useState,createContext } from 'react';
import './App.css';
import Home from './pages/Home';

const ProductsContext=createContext()
function App() {
  const [products,setProducts]=useState([])
  
  return (
    <div className="App">
      <ProductsContext.Provider value={{products,setProducts}}>
        <Home/>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;

export {ProductsContext}
