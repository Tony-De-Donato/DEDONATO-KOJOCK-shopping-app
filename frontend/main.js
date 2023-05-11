const url = "http://localhost:3000/";
const articleCardsContainer = document.getElementById('article-cards');
const marque = document.querySelector("#marque");
const type = document.querySelector("#type");
const btn = document.querySelector("#refresh_button");

let kits;


// ______________________________  filtrage  _________________________________________

btn.addEventListener("click", refresh);

function refresh() {
    fetch(url + 'kit')
        .then(response => response.json())
        .then(data => {
            
            let brand = marque.options[marque.selectedIndex].text;
            let genre = type.options[type.selectedIndex].text;

            if (brand != "Toutes marques") {
                data = data.filter(kit => kit.brand == brand);
            }
            if (genre != "Tous types") {
                data = data.filter(kit => kit.type == genre);
            }
            display_kits(data);
        })
        .catch(err => {
            console.log(err);
        });
}

function display_kits(data) {
    articleCardsContainer.innerHTML = "";
    if (data.length == 0) {
        articleCardsContainer.innerHTML = "<h1>Aucun résultat ne correspond aux filtres que vous venez d'appliquer.</h1>";
    }
    data.forEach(product => {
        // Création des éléments HTML pour chaque carte d'article
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.id = product.id;

        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = product.img_1;
        productImage.onmouseover = () => {
            productImage.src = product.img_2;
        }
        productImage.onmouseout = () => {
            productImage.src = product.img_1;
        }

        const productTitle = document.createElement('h1');
        productTitle.innerText = product.name;
        const price_container = document.createElement('div');
        price_container.classList.add('price-container');

        if (product.reduction != product.price) {
            const originalPrice = document.createElement('span');
            originalPrice.classList.add('original-price');
            originalPrice.innerText = `${product.price}€`;
            price_container.innerHTML = `${originalPrice.outerHTML} ${product.reduction}€`;
        } else {
            price_container.innerHTML = `${product.price}€`;
        }

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.innerText = 'Ajouter au panier';

        
        const productDetailsButton = document.createElement('div');
        productDetailsButton.classList.add('product-details');
        productDetailsButton.innerText = 'Voir la fiche produit';

        // Ajout des éléments HTML à la carte du produit
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(price_container);
        productCard.appendChild(addToCartButton);
        productCard.appendChild(productDetailsButton);

        // Ajout de la carte du produit au conteneur
        articleCardsContainer.appendChild(productCard);
    })
}


// ______________________________  recup tous les kits de l'api  _________________________________________

function getKits() {
    fetch(url + 'kit')
        .then(response => response.json())
        .then(data => {
            display_kits(data);
        }
        )
        .catch(err => {
            console.log(err);
        });
}



// ______________________________  set actual select  _________________________________________



// ______________________________  slider  _________________________________________

const sliders = document.querySelector(".thumbnail");
sliders.addEventListener("click", changeslide(sliders.value) )

slider_img = document.querySelector("#image_carousel");

function changeslide(val) {
    if (val == 1) {
        slider_img.src = product.img_1;
    }
    if (val == 2) {
        productImage.src = product.img_2;
    }
    if (val == 3) {
        productImage.src = product.img_3;
    }
}


getKits();
