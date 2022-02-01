
let panier = JSON.parse(localStorage.getItem("panier"))
let cartItems = document.getElementById("cart__items")

function initiale() {

    for (let i=0 ; i< panier.length; i++){   
        fetch("http://localhost:3000/api/products/"+panier[i].id)
        .then(response => response.json())
        .then(response => insertProduct(response, panier[i].color, panier[i].quantity))
        .then(response => changeQuantity())
        .then(response => deleteQuantity())

        .catch(error => console.error("faute"))
    }
}
window.onload= initiale()

// Insertion des Produits

function insertProduct(product, color, quantity){
  console.log()
  cartItems.innerHTML+= '<article class="cart__item" data-id="'+product._id+'" data-color="'+color+'">'+
  '<div class="cart__item__img">'+
    '<img src="'+product.imageUrl+'" alt="'+product.altTxt+'">'+
  '</div>'+
  '<div class="cart__item__content">'+
    '<div class="cart__item__content__description">'+
     '<h2>'+product.name+'</h2>'+
      '<p>'+color+'</p>'+
      '<p>'+product.price+' €</p>'+
    '</div>'+
    '<div class="cart__item__content__settings">'+
      '<div class="cart__item__content__settings__quantity">'+
        '<p>Qté : </p>'+
        '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+quantity+'">'+
      '</div>'+
      '<div class="cart__item__content__settings__delete">'+
        '<p class="deleteItem">Supprimer</p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '</article>'
}
// Changement quantité article

function changeQuantity () {
  let itemQty = document.querySelectorAll(".itemQuantity")
  console.log(itemQty)
  for(let i = 0; i < itemQty.length; i++){
      itemQty[i].addEventListener("input", function(){
          console.log("ok2")
          let changeQty = itemQty[i].value
          console.log(changeQty)
          panier[i].quantity = changeQty  //changeQuantity
          localStorage.setItem("panier", JSON.stringify(panier))
          // location.reload()
       })
  }
}

// Suppression article

function deleteQuantity () {
    let dlt = document.querySelectorAll(".deleteItem")
    console.log(dlt)
    for(let i = 0; i < dlt.length; i++){
      console.log("ok5")
      dlt[i].addEventListener("click", (event) => {
        event.preventDefault()
        console.log(event)
        // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        let deleteId = panier[i].id
        let deleteColor = panier[i].color
        panier = panier.filter( (elt) => elt.id !== deleteId || elt.color !== deleteColor )
        localStorage.setItem("panier", JSON.stringify(panier))
      })
  }
}

// Récupération total quantité et prix


