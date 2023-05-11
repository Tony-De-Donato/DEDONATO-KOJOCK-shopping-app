const url = "http://localhost:3000/";
const articleCardsContainer = document.getElementById('article-cards');
const marque = document.querySelector("#marque");
const type = document.querySelector("#type");
const btn = document.querySelector("#refresh_button");
const choix = document.querySelector("#choix_piece");
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
    addToCartButton.name = product.id;
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

  });
  filtered_kits();
}




function filtered_kits() {
  let actual = 1;
  const sliders = document.querySelectorAll(".thumbnail");
  const slider_img = document.querySelector("#image_carousel");
  const detail_buttons = document.querySelectorAll('.product-details');
  for (let i = 0; i < detail_buttons.length; i++) {
    detail_buttons[i].addEventListener("click", function () {
      actualise(detail_buttons[i].id);
    });
  }

  const just_add_kit = document.querySelectorAll(".add-to-cart");
  for (let i = 0; i < just_add_kit.length; i++) {
    just_add_kit[i].addEventListener("click", function () {
      actual = just_add_kit[i].name;
      SimplyAddToCart(actual);
    });
  }



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

            document.querySelector("#details_title").innerText = product.name;

            //_____________________description________________________________________________________________________

            let description = product.description;
            let descriptionShort = product.description.slice(0, 150);


            document.getElementById('more-text').innerText = 'Voir plus';
            document.querySelector("#description").innerText = descriptionShort;

            let isLess = true;

            function changeTextMore() {
              if (isLess) {
                document.querySelector("#description").innerText = description;
                document.getElementById('more-text').innerText = 'Voir moins';
              } else {
                document.querySelector("#description").innerText = descriptionShort;
                document.getElementById('more-text').innerText = 'Voir plus';
              }
              isLess = !isLess;
            }

            document.getElementById('more-text').addEventListener('click', changeTextMore);







            

            if (product.reduction != product.price) {
              document.querySelector("#reduction_barree").innerText = product.price;
              console.log(product.price);
              document.querySelector("#selected_price").innerText = product.reduction;
            } else {
              document.querySelector("#selected_price").innerText = product.reduction;
            }

            let choix_a_afficher = choix.options[choix.selectedIndex].text;
            choix.addEventListener("change", function () {
              choix_a_afficher = choix.options[choix.selectedIndex].text;
              if (choix_a_afficher == "kit complet") {
                if (product.reduction != product.price) {
                  document.querySelector("#reduction_barree").innerText = product.price;
                  console.log(product.price);
                  document.querySelector("#selected_price").innerText = product.reduction;
                } else {
                  document.querySelector("#selected_price").innerText = product.reduction;
                }
                document.querySelector("#selected_price").innerText = product.reduction;
              } else if (choix_a_afficher == "pare-choc avant") {
                document.querySelector("#reduction_barree").innerText = "";
                document.querySelector("#selected_price").innerText = product.parts.pare_choc_avant;
              } else if (choix_a_afficher == "pare-choc arrière") {
                document.querySelector("#reduction_barree").innerText = "";
                document.querySelector("#selected_price").innerText = product.parts.pare_choc_arriere;
              } else if (choix_a_afficher == "élargisseurs d'ailes") {
                document.querySelector("#reduction_barree").innerText = "";
                document.querySelector("#selected_price").innerText = product.parts.elargisseurs_ailes;
              }
            });
          }
        });
        actual = id;
        console.log(actual);

        // ______________________________  slider  _________________________________________

        function slider() {

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
        slider();

      }
      )
  }
}
// ______________________________  recup tous les kits de l'api  _________________________________________



function getKits() {
  fetch(url + 'kit')
    .then(response => response.json())
    .then(data => {

      display_kits(data);



      // ______________________________  set actual select  _________________________________________

      filtered_kits();

    }
    )
    .catch(err => {
      console.log(err);
    });
}
getKits();







// ______________________________  ajout au panier  _________________________________________


function SimplyAddToCart(actual1) {

  fetch(url + 'kit')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        if (product.id == actual1) {
          let theID = parseInt(product.id) + "-kit";

          if (localStorage.getItem(theID) != null) {
            let copy = JSON.parse(localStorage.getItem(theID));
            copy.quantity++;
            localStorage.removeItem(theID);
            localStorage.setItem(theID, JSON.stringify(copy));
            console.log("produit ajouté");


          } else {
            const produit = {
              id: theID,
              name: product.name + "- Kit complet",
              price: product.reduction,
              img: product.img_1,
              quantity: 1,

            };
            localStorage.setItem(produit.id, JSON.stringify(produit));
          }

        }
      });
    })

}

function add_from_details() {
  const prix_du_select = document.querySelector('#selected_price').innerText;
  const prix_du_kit = document.querySelector('#selected_price').innerText;
}

//________________________________   modale   _________________________________________________________

function openCartModal() {
  document.getElementById('cart-modal').style.display = 'block';
}

function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

document.querySelector('.close-modal').addEventListener('click', closeCartModal);


function closeCard() {
  document.getElementById('blur').style.display = 'none';
}

document.querySelector('#leave_details').addEventListener('click', closeCard);