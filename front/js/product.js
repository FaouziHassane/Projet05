let color = "";
let qty = "";
window.onload = function(){
    let qs=window.location.search
    let parametres = new URLSearchParams(qs)
    let id = parametres.get('id')
    fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .then(response => insertProduct(response))
    .catch(error => console.error("faute"))
}

// Insertion des produits 

function insertProduct (products) {
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

function chooseColor(e, colors) {
    let selectedColor = colors[e.target.options.selectedIndex-1]
    color = selectedColor;
    console.log(color)
}
function chooseQuantity(e) {
    qty = e.target.value;
    console.log(qty)
}

//  Prépare l'ajout produits au panier

function addToCart(id) {
    let panier;
    console.log(color);
    console.log(qty)
    if(localStorage.getItem("panier")) {
        panier = JSON.parse(localStorage.getItem("panier"))
    } else {
        panier = []
    }

    console.log(panier)
    let add=1
    if(qty != "" && color != "") {
        for (let i =0; i<panier.length; i++){
            console.log(panier[i].quantity)
            if (panier[i].id==id){
                if(panier[i].color==color){
                    add=0
                    panier[i].quantity=parseInt(panier[i].quantity)+parseInt(qty)
                }
            }
        }
        if (add==1){
            let object = {id:id, color:color, quantity:qty}
            panier.push(object)
        }
        console.log("Produit ajouté au panier!")
        console.log(panier)
    } else {
        console.error("Veuillez choisir une couleur et une quantité")
    }

    localStorage.setItem("panier", JSON.stringify(panier))
    
}



