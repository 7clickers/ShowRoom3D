//Lista prodotti
export const products = {
    1: {
      id: 'corallo_1',
      title: 'Corallo 1',
      desc: 'Un corallo bello grande',
      price: 15.99,
      path: 'source/glb/coral_piece.glb',
      x: -2,
      y: 0.2,
      z: 3
    },
    2: {
      id: 'corallo_2',
      title: 'Corallo 2',
      desc: 'Un corallo bello grande',
      price: 9.99,
      path: 'source/glb/purple_coral.glb',
      x: 12,
      y: 0.2,
      z: -10
    },
    3: {
      id: 'corallo_3',
      title: 'Corallo 3',
      desc: 'Un corallo bello grande',
      price: 5.99,
      path: 'source/glb/purple_coral.glb',
      x: -12,
      y: 0.2,
      z: -13
    },
    4: {
      id: 'corallo_3',
      title: 'Corallo 3',
      desc: 'Un corallo bello grande',
      price: 5.99,
      path: 'source/glb/coral_piece.glb',
      x: -18,
      y: 0.2,
      z: -5
    },
  };

//CLASSE CARRELLO
 export class ShoppingCart {
    constructor() {
      this.items = [];
      this.total = 0;
    }
  
    addItem(item) {
      this.items.push(item);
      this.total += item.price;
      this.update();
    }

    removeItemById(index) {
      this.total -= this.items[index].price;
      this.items.splice(index, 1);
      this.update();
    }

    getTotal() {
      return this.items.reduce((total, item) => total + item.price, 0);
    }

    update(){
      if(cart.items.length > 0){
        $('.empty-cart-message').css("display", "none");
        $('#cart-container__inner').css("display", "flex");
        $('#cart-container__total').css("display", "flex");
      } 
      else{
        $('.empty-cart-message').css("display", "block");
        $('#cart-container__inner').css("display", "none");
        $('#cart-container__total').css("display", "none");
      } 
      const innerCart = document.getElementById("cart-container__inner");
      innerCart.innerHTML = ''; // reset del carrello
      for (let i = 0; i < cart.items.length; i++) {
        let item = cart.items[i];
        const innerCart = document.getElementById("cart-container__inner");
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.setAttribute("x", item.x);
        itemElement.setAttribute("y", item.y);
        itemElement.setAttribute("z", item.z);
        itemElement.setAttribute("name", item.id);
        itemElement.setAttribute("cart-item-id", i);
        itemElement.innerHTML = `<img class="teleport-icon" src="../source/arrow-up-icon.png"/><p>${item.title}</p><p>${item.price}€</p><img class="trash-icon" src="../source/trash-icon.png"/>`;
        innerCart.appendChild(itemElement);
        $('.cart-container__total__number').html(cart.total.toFixed(2) + '€'); //aggiorna il totale del carrello
        
      }
    }
  }

  // Creazione del carrello
export const cart = new ShoppingCart();
