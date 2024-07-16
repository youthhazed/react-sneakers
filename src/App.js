import React from 'react';
import {Route} from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/Drawer/index';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import axios from 'axios';
import AppContext from './context';
import Orders from './pages/Orders';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([axios.get('https://30356cbbf4c9bdcb.mokky.dev/cart'), axios.get('https://30356cbbf4c9bdcb.mokky.dev/favorites'), axios.get('https://30356cbbf4c9bdcb.mokky.dev/items')]); 

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных')
      }    
      
    } 

    fetchData();
  }, []);

const onAddToCart = async (obj) => {
  const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    try {
      if (findItem) {
        await axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/cart/${findItem.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://30356cbbf4c9bdcb.mokky.dev/cart', obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };
  
  
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://30356cbbf4c9bdcb.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== id));
    } catch (error) {
      alert('Ошибка при удалении из корзины')
    }
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
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  };

  return (
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, setCartOpened, setCartItems, onAddToCart}}>
      <div className='wrapper clear'>
      <CartDrawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
        
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

          <Route path="/orders" exact>
            <Orders/>
          </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;