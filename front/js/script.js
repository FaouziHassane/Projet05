window.onload = function(){
    fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(response => insertProduct(response))
    .catch(error => console.error("faute"))
}

// Affiche les produits pages d'accueil

function insertProduct (products) {
    let items = document.getElementById("items")
    for (let i=0; i<products.length; i++) {
        items.innerHTML+= '<a href="./product.html?id='+ products[i]._id+'">'+
        '<article>'+
          '<img src="'+ products[i].imageUrl+'" alt="'+ products[i].altTxt+'">'+
          '<h3 class="productName">'+products[i].name+'</h3>'+
          '<p class="productDescription">'+products[i].description+'</p>'+
        '</article>'+
      '</a>'
    }
}



 
