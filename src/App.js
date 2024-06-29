import React from 'react';
import {Route} from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import axios from 'axios';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://30356cbbf4c9bdcb.mokky.dev/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://30356cbbf4c9bdcb.mokky.dev/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://30356cbbf4c9bdcb.mokky.dev/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://30356cbbf4c9bdcb.mokky.dev/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  }; 
  
  const onRemoveItem = (id) => {
    axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/favorites/${obj.id}`)
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else
    {
      axios.post('https://30356cbbf4c9bdcb.mokky.dev/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='wrapper clear'>
      {cartOpened && <CartDrawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      
        <Header 
        onClickCart= {() => setCartOpened(true)}
        />
        <Route path="/" exact>
          <Home 
           items={items}
           searchValue={searchValue}
           setSearchValue={setSearchValue}
           onChangeSearchInput={onChangeSearchInput}
           onAddToFavorite={onAddToFavorite}
           onAddToCart={onAddToCart}
             />
        </Route>

        <Route path="/favorites" exact>
          <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
        </Route>
    </div>

  );
}

export default App;