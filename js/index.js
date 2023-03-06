// Author: Juan Carlo Soirano
// Student #: 301262744
// Assignment 2

const GALLERY_LIST = [1,2,3,4,5,6,7,8,9,10,11,12];
const favouritesList = [];

let gallery;
let imgBox;
let focusIndex = 0;
let body;
let modal;
let modalCloseBtn;
let modalBtn;
let modalError;
let head = 0;

window.onload = function() {
    console.log("Page loaded!")

    // Set modal events
    body = document.body;
    modal = document.getElementById("modal");
    modalCloseBtn = document.getElementById("btn-modal-close");
    modalBtn = document.getElementById("btn-modal");
    modalError = document.getElementById("modal-error-message");

    modalCloseBtn.addEventListener("click", (e) => {
        toggleModalOff();
    });

    modalBtn.addEventListener("click", (e) => {
        addToFavourites();
    })
    
    // Populate gallery
    gallery = document.getElementById("gallery");

    loadGallery();
};

const loadGallery = () => {

    gallery.innerHTML = "";

    // Create Buttons
    let leftBtn = document.createElement("button");
    leftBtn.id = "leftBtn";
    leftBtn.type = "button";
    leftBtn.innerHTML = "<";

    leftBtn.addEventListener("click", (e) => {
        head = head - 4;

        if (head < 0) {
            head += 12;
        }

        loadGallery();
    })

    let rightBtn = document.createElement("button");
    rightBtn.id = "rightBtn";
    rightBtn.type = "button";
    rightBtn.innerHTML = ">";

    rightBtn.addEventListener("click", (e) => {
        head = head + 4;

        if (head > 11) {
            head -= 12;
        }

        loadGallery();
    })

    gallery.appendChild(leftBtn);

    console.log("head",head);

    for (let i = head; i < head + 4; i++) {
        // Create image object
        let img = document.createElement('img');
        img.className = "gallery-img";
        img.id = i;
        img.src = "./img/photo" + (i+1) + ".jpg";

        // Add an onclick event to each image object
        img.addEventListener("click", (e) => {
            toggleModalOn(i);
        });

        // Add image to gallery
        gallery.appendChild(img);
    }

    gallery.appendChild(rightBtn);
}

const toggleModalOn = (i) => {
    focusIndex = i;
    modal.className = "modal";
    body.className = "no-overflow";

    let img = document.getElementById("modal-img");
    img.src = "./img/photo" + (i+1) + ".jpg";

    if (favouritesList.indexOf(i) < 0) {
        modalBtn.innerHTML = "Add to Favourites";
    } else {
        showError("The image is already in your favourites!");
    }
};

const toggleModalOff = () => {
    modal.className = "modal invisible";
    body.className = "";
    modalError.innerHTML = "";
};

const addToFavourites = () => {
    // Show error message
    if (favouritesList.length == 5) {
        showError("Please remove an image from your favourites first before adding a new one!");
    }

    if (favouritesList.indexOf(focusIndex) < 0 & favouritesList.length < 5) {
        favouritesList.push(focusIndex);
        loadFavourites();
        toggleModalOff();
    }
};

const loadFavourites = () => {
    // Clear favourites
    imgBox = document.getElementById("img-box");
    imgBox.innerHTML = '';

    favouritesList.forEach(i => {
        let div = document.createElement("div");
        let img = document.createElement('img');
        let btn = document.createElement('button');

        img.className = "img-box-item";
        img.id = i;
        img.src = "./img/photo" + (i+1) + ".jpg";

        btn.className = "img-box-item-btn";
        btn.id = i;
        btn.innerHTML = "Remove";

        btn.addEventListener("click", (e) => {
            removeFromFavourites(i);
        });

        div.appendChild(img);
        div.appendChild(btn);
        imgBox.appendChild(div);
    });
};

const removeFromFavourites = (n) => {
    let ix = favouritesList.indexOf(n);
    favouritesList.splice(ix, 1);
    loadFavourites();
}

const showError = (message) => {
    modalError.innerHTML = message;
}