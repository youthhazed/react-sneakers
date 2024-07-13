import React from 'react';
import {Route} from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import axios from 'axios';
import AppContext from './context';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {    
      const cartResponse = await axios.get('https://30356cbbf4c9bdcb.mokky.dev/cart');
      const favoritesResponse = await axios.get('https://30356cbbf4c9bdcb.mokky.dev/favorites');
      const itemsResponse = await axios.get('https://30356cbbf4c9bdcb.mokky.dev/items');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

const onAddToCart = (obj) => {
    console.log(obj);

    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/cart${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://30356cbbf4c9bdcb.mokky.dev/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  
  
  const onRemoveItem = (id) => {
    axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
    else 
    {
     const {data} = await axios.post('https://30356cbbf4c9bdcb.mokky.dev/favorites', obj);
    setFavorites((prev) => [...prev, data]);
    }
  }
  catch (error) {
    alert('Не удалось добавить в избранное')
  }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  };

  return (
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, setCartOpened, setCartItems}}>
      <div className='wrapper clear'>
        {cartOpened && <CartDrawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
        
          <Header 
          onClickCart= {() => setCartOpened(true)}
          />
          <Route path="/" exact>
            <Home 
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
              />
          </Route>

          <Route path="/favorites" exact>
            <Favorites onAddToFavorite={onAddToFavorite}/>
          </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;