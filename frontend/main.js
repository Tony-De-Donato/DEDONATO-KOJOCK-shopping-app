const url = "http://localhost:3000/";

const btn = document.querySelector(".sneakers_button");

let sneakers;

btn.addEventListener("click", getSneakers);


function getSneakers() {
    fetch(url + 'sneakers')
        .then(response => response.json())
        .then(data => {
            const articleCardsContainer = document.getElementById('article-cards');
            console.log(data);

            // Boucle sur les articles du fichier JSON
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

                const productPrice = document.createElement('p');
                productPrice.classList.add('price');
                productPrice.innerText = `${product.price}€`;
                if (product.original-price != product.price) {
                    const originalPrice = document.createElement('span');
                    originalPrice.classList.add('original-price');
                    originalPrice.innerText = `${product.originalPrice}€`;
                    productPrice.innerHTML = `${originalPrice.outerHTML} ${product.price}€`;
                }

                const addToCartButton = document.createElement('button');
                addToCartButton.classList.add('add-to-cart');
                addToCartButton.innerText = 'Ajouter au panier';

                const productDetailsButton = document.createElement('a');
                productDetailsButton.classList.add('product-details');
                productDetailsButton.href = product.details;
                productDetailsButton.innerText = 'Voir la fiche produit';

                // Ajout des éléments HTML à la carte d'product
                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);
                productCard.appendChild(productPrice);
                productCard.appendChild(addToCartButton);
                productCard.appendChild(productDetailsButton);

                // Ajout de la carte d'product au conteneur
                articleCardsContainer.appendChild(productCard);
            })
        }
        )
        .catch(err => {
            console.log(err);
        });
}



comparebyprice = (a, b) => {
    return a.price - b.price;
}


function sortbyprice() {
    filteredSneakers.sort(comparebyprice);
    getSneakers();
}


getSneakers();