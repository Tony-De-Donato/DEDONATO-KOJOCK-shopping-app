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
        productDetailsButton.id = product.id;
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
getKits();






// ______________________________  slider  _________________________________________

const sliders = document.querySelector(".thumbnail");
sliders.addEventListener("click", changeslide(sliders.value))

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

// ______________________________  set actual select  _________________________________________


const actual = 1;
const access_detail = document.querySelector(".product-details");
access_detail.addEventListener("click", function(event) {

    // Récupérer l'ID de l'élément qui a été cliqué
    const idElementClique = event.target.id;
  
    // Utiliser l'ID de l'élément cliqué dans une fonction
    actualise(idElementClique);
  });
  
  
const page_detail = document.querySelector("#blur");

function actualise(id) {
    page_detail.style.display = "flex";
    actual = id;
    slider_img.src = product.img_1;
    fetch(url + 'kits/' + id)
        .then(response => response.json())
        .then(data => {
            document.querySelector("#thumb1").innerHTML = data.img_1;
            document.querySelector("#thumb2").innerHTML = data.img_2;
            document.querySelector("#thumb3").innerHTML = data.img_3;
            slider_img.src = data.img_1;
        }
        )
}



// ______________________________  detail / pas detail  _________________________________________





