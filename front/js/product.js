window.onload = function(){
    let qs=window.location.search
    let parametres = new URLSearchParams(qs)
    let id = parametres.get('id')
    fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .then(response => insertProduct(response))
    .catch(error => console.error("faute"))
}

function insertProduct (products) {
    let img = document.getElementsByClassName("item__img")
    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let description = document.getElementById("description")
    let colors = document.getElementById("colors")

    img[0].innerHTML+= '<img src="'+ products.imageUrl+'" alt="'+ products.altTxt+'">'
    title.innerHTML+= products.name
    price.innerHTML+= products.price
    description.innerHTML+= products.description

    for (let i=0; i<products.colors.length; i++) {
        colors.innerHTML+= '<option value="'+products.colors[i]+'">'+products.colors[i]+'</option>'
    }


}


function addToCart (products) {
    addEventListener
}

