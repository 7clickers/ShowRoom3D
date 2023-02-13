import { infoTab } from "./showroom_poc.js";
import { cart, products } from "./products.js";

export function UIClickListeners(){
    // Nascondi dettagli prodotto
    $('.product-info__close-btn').click(function() {
        infoTab.style.display = 'none';
        document.body.requestPointerLock();
      });
      
      // Aggiungi prodotto nel carrello
      $('.product-info__add-btn').click(function(){
        let key = $(this).attr('data');
        cart.addItem(products[key]);
      });
    
      /* Teletrasporto al prodotto (DA IMPLEMENTARE)
      $("#cart-container").on("click", ".teleport-icon", function() {
        let x = $(this).parent().attr("x");
        let y = $(this).parent().attr("y");
        let z = $(this).parent().attr("z");
        //Teleport(x,y,z);
      }); */
      
      //Rimuovi prodotto dal carrello
      $("#cart-container").on("click", ".trash-icon", function() {
        let id = $(this).parent().attr("cart-item-id");
        //console.log(id);
        cart.removeItemById(id);
      });      
}