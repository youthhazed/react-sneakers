import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch("https://667939a118a459f6394ea6f0.mockapi.io/items").then(res => {
    return res.json();
      })
    .then((json) => {
      setItems(json)
      });
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
  }

  console.log(cartItems)

  return (
    <div className='wrapper clear'>
      {cartOpened && <CartDrawer items={cartItems} onClose={() => setCartOpened(false)}/>}
      <Header 
      onClickCart= {() => setCartOpened(true)}
      />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="img/search-icon.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        
        <div className="d-flex flex-wrap">
          {
            items.map((item) => (
              <Card 
              title={item.title}
              price = {item.price}
              imageUrl = {item.imageUrl}
              onFavorite = {() => console.log('Добавили в закладки')}
              onPlus = {(obj) => onAddToCart(item)}/>
          ))
          }
        </div>
      </div> 
    </div>

  );
}

export default App;