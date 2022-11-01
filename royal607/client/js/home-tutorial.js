console.log("Welcome to Home!");

const divs = document.getElementsByTagName("div");

// nume.metoda()
// nume.atribute 

// Pentru modificarea proprietatilor unui element
// 1. Extrag elementul folosind nume, tagName, id, className, etc (vezi getElement(s)By...)
// 2. Identific numele proprietatii pe care vreau sa o modific pe acel obiect
// 3. Modific valoarea acelei proprietati
const logoImage = document.getElementById("logo-image");
logoImage.style.height = "100px";

// Cum aflu ce atribute exista pe un element si ce valori au acestea
console.log(logoImage.getAttributeNames());
console.log(logoImage.getAttribute("id"));
const logoImageAttributes = logoImage.getAttributeNames();
for (let attrIndex = 0; attrIndex < logoImageAttributes.length; attrIndex++) {
    const currentAttributeName = logoImageAttributes[attrIndex];
    const currentAttributeValue = logoImage.getAttribute(currentAttributeName);
    console.log(`${currentAttributeName}: ${currentAttributeValue}`);
}

for (let i = 0; i < divs.length; i++) {
    const currentDiv = divs[i];
    const currentDivClass = currentDiv.getAttribute("class");
    
    if (currentDivClass === "container") {
        console.log(`Container div:`, currentDiv);
    }
}


// Pentru adaugarea unui element nou
// 1. Identific parintele elementului in DOM 
// 2. Extrag elementul parinte folosind document.getElemenet(s)... 
// 3. Creez un element nou folosind document.createElement("tagul")
// 4. Customizez elementul nou creat
// 5. Adaug elementul nou creat la lista de copii a elementului parinte folosing appendChild(element)
let body = document.getElementsByTagName("body");
body = body[0];
const paragraph = document.createElement("p");
paragraph.innerText = "Acesta este un paragraf creat dinamic";
body.appendChild(paragraph);

// Pentru stergerea unui element
// 1. Identific parintele
// 2. Identific elementul pe care vreau sa il sterg
// 3. Sterg elementul folosing removeChild 
const elements = document.getElementById("top-right-nav");
for (let i = 0; i < elements.children.length; i++) {
    const currentChild = elements.children[i];
    const currentChildName = currentChild.getAttribute("name");
    if (currentChildName == "virtual-coin-span") {
        elements.removeChild(currentChild);
    }
}

const topPlayers = ["Player 1", "Player 2", "Player 3"];
const list = document.getElementById("top-players-list");
for (let i = 0; i < topPlayers.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerText = topPlayers[i];
    listItem.classList = ["list-item"];
    list.appendChild(listItem);
}
