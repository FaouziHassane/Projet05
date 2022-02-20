let color = "";
let qty = "";

// Récupération de l'id du produit à afficher à la page produit
// Récupération des articles de l'API
//Récupération de l'article grace a l'id + affichage des données de ce dernier
window.onload = function getProduct(){
    let qs=window.location.search
    let parametres = new URLSearchParams(qs)
    let id = parametres.get('id')  //Récupération de l'id via les paramètres de l'url
    fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .then(response => insertProduct(response))
    .catch(erreur => alert("Erreur requête."))
}

// Insertion de l'article sélectionné et ses détails dans la page Produit
function insertProduct (products) {
    let img = document.getElementsByClassName("item__img")  //Récupération des sélecteurs pour les futurs modifications
    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let description = document.getElementById("description")
    let colors = document.getElementById("colors")
    colors.addEventListener("change", function (e){
        chooseColor(e, products.colors)
    })
    let quantity = document.getElementById("quantity")
    quantity.addEventListener("change", function (e){
        chooseQuantity(e)
    })
    let btnAddToCart = document.getElementById("addToCart")
    btnAddToCart.addEventListener("click", function (){
        addToCart(products._id)
    })
    img[0].innerHTML+= '<img src="'+ products.imageUrl+'" alt="'+ products.altTxt+'">'
    title.innerHTML+= products.name
    price.innerHTML+= products.price
    description.innerHTML+= products.description

    for (let i=0; i<products.colors.length; i++) {
        colors.innerHTML+= '<option value="'+products.colors[i]+'">'+products.colors[i]+'</option>'
    }
}


// Sélectionner la couleur de l'article
function chooseColor(e, colors) {
    let selectedColor = colors[e.target.options.selectedIndex-1]
    color = selectedColor;
}

// Sélectionner la quantité d'article
function chooseQuantity(e) {
    qty = e.target.value;
}

//  Gestion du panier
function addToCart(id) {
    let panier;
    if(localStorage.getItem("panier")) {
        panier = JSON.parse(localStorage.getItem("panier"))
    } else {
        panier = []
    }
    // vérification des conditions : quantité, couleur et id
    let add=1
    if(qty != "" && color != "") {
        if (qty > 0 && qty < 100 ) {
            for (let i =0; i<panier.length; i++){
                //console.log(panier[i].quantity)
                if (panier[i].id==id){           // Articles ayant même id
                    if(panier[i].color==color){  // Articles ayant même couleur
                        add=0                    // Addition nulle
                        panier[i].quantity=parseInt(panier[i].quantity)+parseInt(qty)
                    }
                }
            }
            if (add==1){
                let object = {id:id, color:color, quantity:qty}
                panier.push(object)
            }
            alert("produit ajouté au panier!")
        }  else {
            alert("Choisir une quantité entre 1 et 100")
        }         
    } else {
        alert("Veuillez choisir une couleur et une quantité")  // Si le panier est vide
    }
    // Ajout au id, couleur et quantité au panier 
    localStorage.setItem("panier", JSON.stringify(panier)) 
}

// Ajouté un article au panier
//Si le produit commandé est déjà dans le panier
//Si le produit commandé n'est pas dans le panier
// Création de la balise "article" et insertion dans la section
//Si pas de produits dans le local storage on affiche que le panier est vide
 // envoyer les nouvelles données dans le localStorage