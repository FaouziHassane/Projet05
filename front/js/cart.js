
let panier = JSON.parse(localStorage.getItem("panier"))
let cartItems = document.getElementById("cart__items")

function initiale() {

    for (let i=0 ; i< panier.length; i++){   
        fetch("http://localhost:3000/api/products/"+panier[i].id)
        .then(response => response.json())
        .then(response => insertProduct(response, panier[i].color, panier[i].quantity))
        .then(response => changeQuantity())
        .then(response => deleteQuantity())
        .then(response => getTotals())

        .catch(error => console.error("faute"))
    }
}
window.onload= initiale()

// Insertion des Produits
let a = 0;   // prix
let b = 0;   // quantité

function insertProduct(product, color, quantity){
  console.log()
  a+=product.price*quantity;  
  b+=parseInt(quantity);

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
  for(let i = 0; i < itemQty.length; i++){
      itemQty[i].addEventListener("input", function(){
        let changeQty = itemQty[i].value
        panier[i].quantity = changeQty  
        localStorage.setItem("panier", JSON.stringify(panier))
        location.reload()
       })
  }
}

// Suppression article

function deleteQuantity () {
    let dlt = document.querySelectorAll(".deleteItem")
    for(let i = 0; i < dlt.length; i++){
      dlt[i].addEventListener("click", () => {
        //event.preventDefault()
        //console.log(event)
        // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        let deleteId = panier[i].id
        let deleteColor = panier[i].color
        panier = panier.filter( (elt) => elt.id !== deleteId || elt.color !== deleteColor )
        localStorage.setItem("panier", JSON.stringify(panier))
        location.reload()
      })
  }
}

// Récupération total quantité et prix

function getTotals () {
  // Total quantité:   
  let totalQuantityProduct = document.getElementById("totalQuantity") 
  totalQuantityProduct.innerHTML = b  // Affichage quantié
  // Total prix: 
  let totalPriceProduct = document.getElementById("totalPrice")
  totalPriceProduct.innerHTML = a  // Affichage prix
}

// Passer commande

function form () {
  let check = true
  // Récupération données client

  const textRegex = /^[A-Za-z\s]{5,50}$/
  const adressRegex = /^[A-Za-z0-9\s]{5,50}$/
  const mailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

  let firstName = document.getElementById("firstName").value
  let lastName = document.getElementById("lastName").value
  let adress = document.getElementById("address").value
  let city = document.getElementById("city").value
  let mail = document.getElementById("email").value

  console.log(firstName.match(textRegex)) 
  console.log(adress.match(adressRegex))
  console.log(mail.match(mailRegex)) 

  console.log(lastName.match(textRegex)) 
  console.log(city.match(textRegex)) 

  // Récupérations des valeurs formulaire pour les mettre au LocalStorage
  
  localStorage.setItem("nom", firstName)
  localStorage.setItem("prenom", lastName)
  localStorage.setItem("adresse", adress)
  localStorage.setItem("ville", city)
  localStorage.setItem("email", mail)


  // fonction validation formulaire
  function validateFirstName () {
    if(firstName.match(textRegex)){
      document.getElementById("firstNameErrorMsg").innerHTML = ''
    } else {document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez bien saisir le champ Prénom"}
  }
  validateFirstName()

  function validateLastName () {
    if(lastName.match(textRegex)){
      document.getElementById("lastNameErrorMsg").innerHTML = ''
    } else {document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez bien saisir le champ Nom"}
  }
  validateLastName()

  function validateAdress () {
    if(adress.match(adressRegex)){
      document.getElementById("addressErrorMsg").innerHTML = ''
    } else {document.getElementById("addressErrorMsg").innerHTML = "Veuillez bien saisir le champ Adresse"}
  }
  validateAdress()

  function validateCity () {
    if(city.match(textRegex)){
      document.getElementById("cityErrorMsg").innerHTML = ''
    } else {document.getElementById("cityErrorMsg").innerHTML = "Veuillez bien saisir le champ Ville"}
  }
  validateCity()

  function validateMail () {
    if(mail.match(mailRegex)){
      document.getElementById("emailErrorMsg").innerHTML = ''
    } else {document.getElementById("emailErrorMsg").innerHTML = "Veuillez bien saisir le champ Email"}
  }
  validateMail()

}

// Bouton commander
let submit = document.getElementById("order") 
submit.addEventListener("click", function(event){
  event.preventDefault()
  form()
  postForm()
})


// Fonction envoie données
function postForm (){

  // Mettre les valeurs formulaire dans un objet
  let contact = {
    firstName: "test",
    lastName: "test",
    adress: "test",
    city: "test",
    email: "test@test.com"
  }

 //Construction d'un array d'id depuis le local storage
 let products = [];
 for (let i = 0; i<panier.length;i++) {
     products.push(panier[i].id);
 }
 console.log(products);
  

  // Mettre les valeurs formulaire et produits dans un objet
  let sendData = {
    contact,
    products,
  }
  
  // Send to server

  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData),
  };


  let serveur = fetch("http://localhost:3000/api/products/order", options);
  
 /*
  .then(response => response.json())
  .then(data => {
  localStorage.setItem('orderId', data.orderId);
  window.location.href = 'confirmation.html?id='+ data.orderId;}); 
 */
  
  // voir les résultat serveur dans la console
  
  serveur.then(async(response)=>{
    try{
      console.log("reponse")
      console.log(response)

      let contenu = await response.json()
      console.log("contenu")
      console.log(contenu)
    } catch(e){
      console.log(e)
    }
  })
  

}


/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */