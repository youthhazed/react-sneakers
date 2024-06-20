import Card from './components/Card';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';

 const arr = [{
  title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg' 
  },
  {
    title: 'Мужские Кроссовки Under Armour Curry 8', price: 8499, imageUrl: '/img/sneakers/2.jpg' 
    },
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8999, imageUrl: '/img/sneakers/3.jpg'
  },
  {
    title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: '/img/sneakers/4.jpg' 
    }
 ];

function App() {
  return (
    <div className="wrapper clear">
      <CartDrawer/>
      <Header/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="img/search-icon.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        
        <div className="d-flex">
          {
            arr.map((obj) => (
              <Card 
              title={obj.title}
              price = {obj.price}
              imageUrl = {obj.imageUrl}
              onClick = {() => console.log(obj)}/>
          ))
          }
        </div>
      </div>
    </div>

  );
}

export default App;