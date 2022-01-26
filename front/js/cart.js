
let panier = JSON.parse(localStorage.getItem("panier"))
let cartItems = document.getElementById("cart__items")

function initiale() {

    for (let i=0 ; i< panier.length; i++){   
        fetch("http://localhost:3000/api/products/"+panier[i].id)
        .then(response => response.json())
        .then(response => insertProduct(response, panier[i].color, panier[i].quantity))
        .catch(error => console.error("faute"))
    }
    
    changeQuantity()
}
window.onload= initiale()

function insertProduct(product, color, quantity){
    console.log(product)
    cartItems.innerHTML+= '<article class="cart__item" data-id="'+product._id+'" data-color="'+color+'">'+
    '<div class="cart__item__img">'+
      '<img src="'+product.imageUrl+'" alt="'+product.altTxt+'">'+
    '</div>'+
    '<div class="cart__item__content">'+
      '<div class="cart__item__content__description">'+
       '<h2>'+product.name+'</h2>'+
        '<p>'+color+'</p>'+
        '<p>'+product.price+'€</p>'+
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


function changeQuantity () {
    console.log("ok")
    let itemQty = document.querySelectorAll(".itemQuantity")
    console.log(itemQty)
    for(let i = 0; i < itemQty.length; i++){
        console.log("ok1")
        // itemQty[i].addEventListener("input", function(){
        //     console.log("ok2")
        //     let changeQty = itemQty[i].value
        //     panier[i].quantity = changeQuantity
        //     localStorage.setItem("panier", JSON.stringify(panier))
        //     location.reload()
        // })
    
    }

}


/*
function deleteQuantity () {
    let removeItem = document.getElementsByClassName("deleteItem")
    removeItem.addEventListener('change', function () {
        window.localStorage.removeItem("quantity")
    })

    console.log(removeItem)
}
deleteQuantity() 
*/