import './Css/Search.css'
import { useState } from 'react'; 

import SearchIcon from '../../Public/Search.svg'; 

const Search = ()=>{
  const [ SearchInput, setSearchInput ] = useState(''); 
  return (
  <>
    <div className="Search">
      <img src={SearchIcon} alt="Search" />
      <input type="text" value={SearchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search..'/>
    </div>
  </>   
  )
}

export default Search; 
