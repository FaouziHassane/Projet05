// Récupération des articles de l'API
window.onload = function getProducts(){
    fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(response => insertProducts(response))
    .catch(erreur => alert("Erreur requête."))
}

// Répartition des données dans le DOM et affichage des articles dans la page Accueil
function insertProducts (products) {
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