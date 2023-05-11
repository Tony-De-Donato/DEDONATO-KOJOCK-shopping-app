const url = "http://localhost:3000/";
const articleCardsContainer = document.getElementById('article-cards');
const marque = document.querySelector("#marque");
const type = document.querySelector("#type");
const btn = document.querySelector("#refresh_button");
const page_detail = document.querySelector("#blur");
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



      // ______________________________  set actual select  _________________________________________

      let actual = 1;
      const sliders = document.querySelectorAll(".thumbnail");
      const slider_img = document.querySelector("#image_carousel");
      const detail_buttons = document.querySelectorAll('.product-details');
      for (let i = 0; i < detail_buttons.length; i++) {
        detail_buttons[i].addEventListener("click", function () {
          actualise(detail_buttons[i].id);
        });
      }

      console.log(document.querySelectorAll('.product-details'));


      function actualise(id) {
        fetch(url + 'kit')
          .then(response => response.json())
          .then(data => {
            page_detail.style.display = "flex";
            data.forEach(product => {
              if (product.id == id) {
                slider_img.src = product.img_1;
                page_detail.style.display = "flex";
                document.querySelector("#thumb1").src = product.img_1;
                document.querySelector("#thumb2").src = product.img_2;
                document.querySelector("#thumb3").src = product.img_3;
                slider_img.src = product.img_1;
              }
            })
            actual = id;
            slider();

          }
          )
      }



      // ______________________________  slider  _________________________________________

      function slider() {
        console.log(sliders);
        console.log(actual);

        for (let i = 0; i < sliders.length; i++) {
          sliders[i].addEventListener("click", function () {
            sliders.forEach(slider => {
              slider.classList.remove("the_thumb");
            }
            );
            sliders[i].classList.add("the_thumb");
            changeslide(sliders[i].name);
          });
        }

        function changeslide(val) {
          if (val == 1) {
            slider_img.src = "assets/kits/kit" + actual + "/img1.jpg";
          }
          if (val == 2) {
            slider_img.src = "assets/kits/kit" + actual + "/img2.jpg";
          }
          if (val == 3) {
            slider_img.src = "assets/kits/kit" + actual + "/img3.jpg";
          }
        }
      }

    }
    )
    .catch(err => {
      console.log(err);
    });
}
getKits();







// ______________________________  detail / pas detail  _________________________________________



//________________________________modale_________________________________________________________

function openCartModal() {
  document.getElementById('cart-modal').style.display = 'block';
}

function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

document.querySelector('.close-modal').addEventListener('click', closeCartModal);
