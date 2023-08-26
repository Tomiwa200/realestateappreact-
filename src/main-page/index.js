import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import SearchResults from '../search-results';
import HouseFilter from '../house/house-filter';
import HouseFromQuery from '../house/HouseFromQuery';
function App() {
   const [allHouses, setAllHouses] = useState([]);
  useEffect( ()=> {
    const  fetchHouses =  async () => {
      const resp = await fetch('./houses.json');
      const houses = await resp.json();
      setAllHouses(houses);
    }
    fetchHouses();
  }, []);
  
  const featuredHouse = useMemo(()=> {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random()* allHouses.length);
     return allHouses[randomIndex];
    }
  }, [allHouses]);
  
  return (
    <Router>
      <div className='container'>
        <Header subtitle="Providing houses al over the world"/>
        <HouseFilter allHouses={allHouses} />

        
      
        <Routes>

            <Route path='/searchresults/:country' element={<SearchResults allHouses=
                {allHouses}/>} />
                <Routes path='/house/:id' element={<HouseFromQuery allHouses={allHouses}/>}/>
                  <Route path="/" element ={<FeaturedHouse house=
                  {featuredHouse}/>} />
                  
                  
        </Routes>
          
        
      </div>
    </Router>
  )
    
}

export default App;
