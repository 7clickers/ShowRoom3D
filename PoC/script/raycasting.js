import { camera, scene } from './showroom_poc.js';
import { threeProducts } from './world.js';
import { mouse, keyStates } from './player.js';
import { products, cart } from './products.js';
import { raycaster, y, ring, ProductSpotLight, interactionBar, infoTab, cartContainer } from './showroom_poc.js';

//RAYCASTING
var flag = false;

export function Raycasting(){
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    raycaster.far = 7.5;

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( threeProducts );

    // se ci sono una o piu' intersezioni
    if ( intersects.length > 0 ) {
        // l'oggetto nella prima intersezione e' quello piu' vicino
        let object = intersects[0].object;
        //si trova l'oggetto corretto perche' ogni modello ha textures e altre cose che lo compongono
        //l'oggetto corretto e' l'elemento piu' in alto nella gerarchia di elementi che compongono il modello
        while(object.parent.type != 'Scene'){
            object = object.parent;
        }
        //Si rende visibile l'anello nella posizione del oggetto in questione
        ring.visible = true;
        ring.position.x = object.position.x;
        ring.position.y = 0.5;
        ring.position.z = object.position.z;

        //si rende visibile la luce nella posizione dell'anello
        ProductSpotLight.visible = true;
        ProductSpotLight.position.set(object.position.x, 12, object.position.z);
        ProductSpotLight.target = ring;
        
        //Si apre il tab per l'interazione con il prodotto
        interactionBar.style.display = "block";
        if (flag == false && keyStates['KeyE']) {
            document.exitPointerLock();
            setTimeout(showInfo(object),200);
            flag = true;
        }
        else {
            
        }
    }
    else{
        interactionBar.style.display = "none";
        ring.visible = false;
        ProductSpotLight.visible = false;
        flag = false;
    }
}
//si generano i dettagli del prodotto e del carrello
export function showInfo(object) {
    if(cart.items.length > 0){
        $('.empty-cart-message').css("display", "none");
        $('#cart-container__total').css("display", "flex");
    } 
    else{
        $('.empty-cart-message').css("display", "block");
        $('#cart-container__total').css("display", "none");
    }

	if (infoTab.style.display === "block") {
        infoTab.style.display = "none";
	} else {
        let title = products[object.name].title;
        let desc = products[object.name].desc;
        let price = products[object.name].price;
       $('.product-info__title').text(title);
       $('.product-info__desc').text(desc);
       $('.product-info__price').text("Prezzo: " + price + "€");
       $('.product-info__add-btn').attr("data", object.name);
        infoTab.style.display = "block";
        
	}
}