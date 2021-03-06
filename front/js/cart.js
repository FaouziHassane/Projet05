
//Initialisation du local storage
let panier = JSON.parse(localStorage.getItem("panier"))
let cartItems = document.getElementById("cart__items")

// création des expressions régulières
const textRegex = /^[A-Za-z\s]{5,50}$/
const adressRegex = /^[A-Za-z0-9\s]{5,50}$/
const mailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

// Préparer la validation du formulaire
let firstNameErreur = true
let lastNameErreur = true
let cityErreur = true
let addressErreur = true
let emailErreur = true

// Récupération des produits séléctionnées
function getProducts() {
  if(panier != null){
    for (let i=0 ; i< panier.length; i++){   
      fetch("http://localhost:3000/api/products/"+panier[i].id)
      .then(response => response.json())
      .then(response => insertCart(response, panier[i].color, panier[i].quantity))
      .then(response => changeQuantity())
      .then(response => deleteQuantity())
      .then(response => getTotal())
      .catch(error => console.error("Erreur"))
    }
  }
}
window.onload= getProducts()

let a = 0;   // prix
let b = 0;   // quantité

// Insertion et affichage des Produits du panier dans la page Panier
function insertCart(product, color, quantity){
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

// Modification quantité articles
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

// Suppression articles
function deleteQuantity () {
    let dlt = document.querySelectorAll(".deleteItem")
    for(let i = 0; i < dlt.length; i++){
    dlt[i].addEventListener("click", () => {
      // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
      let deleteId = panier[i].id
      let deleteColor = panier[i].color
      panier = panier.filter( (elt) => elt.id !== deleteId || elt.color !== deleteColor )
      localStorage.setItem("panier", JSON.stringify(panier))
      location.reload()
    })
  }
}

// Récupération total articles et prix
function getTotal () {
  // Total articles:   
  let totalQuantityProduct = document.getElementById("totalQuantity") 
  totalQuantityProduct.innerHTML = b  
  // Total prix: 
  let totalPriceProduct = document.getElementById("totalPrice")
  totalPriceProduct.innerHTML = a  
}

// Validation Prénom
function validateFirstName (firstName) {
  if(firstName.match(textRegex)){
    document.getElementById("firstNameErrorMsg").innerHTML = ''
  } else {document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez bien saisir le champ Prénom"
  firstNameErreur = false}                            
}

// Validation Nom
function validateLastName (lastName) {
  if(lastName.match(textRegex)){
    document.getElementById("lastNameErrorMsg").innerHTML = ''
  } else {document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez bien saisir le champ Nom"
  lastNameErreur = false}
}

// Validation adresse
function validateAdress (address) {
  if(address.match(adressRegex)){
    document.getElementById("addressErrorMsg").innerHTML = ''
  } else {document.getElementById("addressErrorMsg").innerHTML = "Veuillez bien saisir le champ Adresse"
  addressErreur = false}
}

// Validation ville
function validateCity (city) {
  if(city.match(textRegex)){
    document.getElementById("cityErrorMsg").innerHTML = ''
  } else {document.getElementById("cityErrorMsg").innerHTML = "Veuillez bien saisir le champ Ville"
  cityErreur = false}
}

// Validation email
function validateMail (email) {
  if(email.match(mailRegex)){
    document.getElementById("emailErrorMsg").innerHTML = ''
  } else {document.getElementById("emailErrorMsg").innerHTML = "Veuillez bien saisir le champ Email"
  emailErreur = false}
}

// Formulaire de commande
function form () {

  // Récupérer les données saisies par l’utilisateur
  let firstName = document.getElementById("firstName").value
  let lastName = document.getElementById("lastName").value
  let address = document.getElementById("address").value
  let city = document.getElementById("city").value
  let email = document.getElementById("email").value

  // Appel fonctions analysant données saisies par l’utilisateur
  validateFirstName(firstName)
  validateLastName(lastName)
  validateAdress(address)
  validateCity(city)
  validateMail(email)
}

// Bouton commander
let submit = document.getElementById("order") 
if (submit != null) {
  submit.addEventListener("click", function(event){
    event.preventDefault()
    form()

    // Validation formulaire avant envoie au localstorage et serveur
    if (firstNameErreur && lastNameErreur && cityErreur && addressErreur && emailErreur) {
      // Envoi données au serveur 
      postForm ()
    }
  })
}

// Envoie données formulaire
function postForm (){
  // Constitution de l'objet contact : Mise des valeurs formulaire dans l'objet 
  let contact = { 
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  }
  //Construction d'un array d'id depuis le local storage
 let products = [];
 for (let i = 0; i<panier.length;i++) {
    for (let j=0; j<panier[i].quantity; j++){
      products.push(panier[i].id);
    }
 }
  // Mise des valeurs formulaire et produits dans un objet
  let sendData = {
    contact,
    products,
  }
  // Variable avec données promesse, requête POST
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData),
  };

    // Envoie commande au serveur
  let sendApi = fetch("http://localhost:3000/api/products/order", options)
  .then(response => response.json())
  .then(data => {
  localStorage.setItem("orderId", data.orderId);
  localStorage.removeItem("panier")
  document.location.href = "confirmation.html";
});
}

// Affichage id commande à la page confirmation
function confirmation(){
  let orId = document.getElementById("orderId");
  if (orId != null) {
    orId.innerHTML = localStorage.getItem("orderId");
    localStorage.removeItem('orderId')
  }
}
confirmation()

