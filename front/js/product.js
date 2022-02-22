let color = "";
let qty = "";
//Récupération de l'article grace a l'id 
window.onload = function getProduct(){
    let qs=window.location.search
    //Récupération de l'id via les paramètres de l'url
    let parametres = new URLSearchParams(qs)
    let id = parametres.get('id') 
    fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .then(response => insertProduct(response))
    .catch(erreur => alert("Erreur requête."))
}

// Insertion dans le Dom de l'article sélectionné et ses détails et l'afficher à la page Produit
function insertProduct (products) {
    //Récupération des sélecteurs
    let img = document.getElementsByClassName("item__img")  
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
        alert("Veuillez choisir une couleur et une quantité")
    }
    // Ajout du id, couleur et quantité au panier
    localStorage.setItem("panier", JSON.stringify(panier)) 
}
