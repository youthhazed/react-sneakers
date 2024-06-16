function CartDrawer() {
    return ( 
        <div style={{display: 'none'}} className="overlay">
    <div className="drawer p-30 " style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 className="d-flex justify-between mb-30">Корзина <img className="removeBtn cu-p" src="img/btn-remove.svg" alt="" /></h2>
        

        <div className="items" style={{
          flex: 1
        }}>
        <div className="cartItem d-flex align-center mb-20">
          

          <div style={{ backgroundImage: 'url(img/sneakers/1.jpg)'}}
           className="cartItemImg">

          </div>

          <div className="mr-20 flex">
            <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
            <b>12 999 руб.</b>
          </div>
          <img className="removeBtn" src="img/btn-remove.svg" alt="" />
        </div>

        <div className="cartItem d-flex align-center">
          

          <div style={{ backgroundImage: 'url(img/sneakers/1.jpg)'}}
           className="cartItemImg">

          </div>

          <div className="mr-20 flex">
            <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
            <b>12 999 руб.</b>
          </div>
          <img className="removeBtn" src="img/btn-remove.svg" alt="" />
        </div>
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>  
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ 
          <img src="img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
      </div> );
};
export default CartDrawer