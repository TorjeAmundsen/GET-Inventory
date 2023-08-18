/*

GET Academy - Start IT Klasse C Team 1
Teamoppgave #1 - Inventory

*/

//Toggler synligheten til inventaret vet å toggle en klasse 'none' som bare har display: none i seg
function toggleDisplay(id) {
    document.getElementById(id).classList.toggle("none");
};

// Her definerer vi lister ( eller arrays) som skal inneholde items i inventarene, og også hvilke bilder som skal være inni hver boks
// Alle verdiene starter som 'null', som indikerer at alle er tomme
let inventory_left      = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; // 16 items, 4 x 4 rutenett
let inventory_right     = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

let inventoryLeftImg    = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
let inventoryRightImg   = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

let left_IDs    = ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15"];
let right_IDs   = ["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15"];

// Liste med mulige items
const ITEMS = [
    "Sword",
    "Shield",
    "Health Potion",
    "Mana Potion",
    "AK-47",
    "RPG",
    "Fishing Rod",
    "Duct Tape",
    "Rope",
    "Strawberry",
    "Feller"
];

//Liste av bilder til de ulike gjenstandene
const IMAGES = [
    "sword.png",
    "shield.jpg",
    "health potion.jpg",
    "mana potion.jpg",
    "ak-47.jpg",
    "rpg.jpg",
    "fishing rod.png",
    "duct tape.png",
    "rope.jpg",
    "strawberry.png",
    "feller.png"
];

// Oppdaterer inventaret visuelt på siden
function updateInventory() {
    for (let i = 0; i < inventory_right.length; i++) {       // Looper gjennom koden under like mange ganger som vi har slots i inventaret
                                                             // Først går vi gjennom inventaret på høyresiden
        let element = document.getElementById(right_IDs[i]); // Her velges den enkelte 'boksen' som vi skal redigere
        element.innerHTML = inventory_right[i];              // Innholdet i den enkelte boksen settes til teksten i inventory_right-lista
        if (inventoryRightImg[i] != null) {                  // Hvis boksen ikke er tom, gir vi den et bakgrunnsbilde fra en liste "IMAGES"
            element.style.backgroundImage = `url('img/${inventoryRightImg[i]}')`
            element.classList.add("has-item");
        } else {
            element.style.backgroundImage = "none";          // Hvis boksen er tom, fjerner vi bakgrunnsbildet
            element.classList.remove("has-item");
        };
        
        // Her gjøres det samme, men for boksen på venstresiden
        let element2 = document.getElementById(left_IDs[i]);
        element2.innerHTML = inventory_left[i];
        if (inventoryLeftImg[i] != null) {  
            element2.style.backgroundImage = `url('img/${inventoryLeftImg[i]}')`;
            element2.classList.add("has-item");
        } else {
            element2.style.backgroundImage = "none";
            element2.classList.remove("has-item");
        }
    };
};

//Genererer et tilfeldig nummer mellom det minimale og maksimale nummeret
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//Genererer tilfeldige items eller blanke ruter som da legges til i inventaret på høyresiden
function generateRandomItems() {
    for (let i = 0; i < inventory_right.length; i++) {
        let random = getRandomNumber(0, 30); // For hver boks i inventaret genererer et tilfeldig tall mellom 0 og 30
        if (random <= 10) {                  // Hvis tallet er mindre enn eller likt 10 setter vi inn et item
            inventory_right[i] = ITEMS[random];
            inventoryRightImg[i] = IMAGES[random];
        } else {                             // Hvis tallet er over 10 gjør vi boksen blank
            inventory_right[i] = null;
            inventoryRightImg[i] = null;
        };
    };
    updateInventory();
};

// Flytter et item fra elementet du klikket på til det andre inventaret
function moveItem(element, slot) {
    if (element.parentNode.id == "right") {
        for (let i = 0; i < inventory_left.length; i++) {                 // Vi looper gjennom inventaret på andre siden av den du trykket inni
            if (inventory_left[i] === null || inventory_left[i] === "") { // Når den finner en boks i det andre inventaret som er tom
                inventory_left[i] = element.innerHTML;                    // setter vi inn itemet du klikket på inn i den tomme boksen vi fant
                inventory_right[slot] = null;                             // Etterpå sletter vi itemet fra boksen du klikket på
                inventoryLeftImg[i] = inventoryRightImg[slot];
                inventoryRightImg[slot] = null;
                updateInventory();
                return;
            };
        };
    }else {                                                               // Lik funksjon, bare flytter andre veien
        for (let i = 0; i < inventory_right.length; i++) {
            if (inventory_right[i] === null || inventory_right[i] === "") {
                inventory_right[i] = element.innerHTML;
                inventory_left[slot] = null;
                inventoryRightImg[i] = inventoryLeftImg[slot];
                inventoryLeftImg[slot] = null;
                updateInventory();
                return;
            };
        };
    };
};

// Flytter alt fra høyre side inn til inventaret der de får plass, ved å loope gjennom inventaret å sjekke etter 'null', altså tomme bokser
function lootAll(){
    for (let right_slot = 0; right_slot < inventory_right.length; right_slot++) {
        if (inventory_right[right_slot] != null || inventory_right[right_slot] != "") {
            for (let left_slot = 0; left_slot < inventory_left.length; left_slot++) {
                if (inventory_left[left_slot] === null || inventory_left[left_slot] === "") {
                    inventory_left[left_slot] = inventory_right[right_slot];
                    inventory_right[right_slot] = null;
                    inventoryLeftImg[left_slot] = inventoryRightImg[right_slot];
                    inventoryRightImg[right_slot] = null;
                }
            }
        }
    }
    updateInventory();
}

// Fjerner alle items ved å sette alle verdiene til null (ingenting) og oppdaterer inventaret
function clearAll() {
    inventory_left      = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    inventory_right     = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    inventoryLeftImg    = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    inventoryRightImg   = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    updateInventory();
}