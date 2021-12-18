window.onload = function(){
    let qs=window.location.search
    let parametres = new URLSearchParams(qs)
    let id = parametres.get('id')
    fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error("faute"))
}