/*

GET Academy - Start IT Klasse C Team 1
Teamoppgave #1 - Inventory

*/

//Toggler synligheten til inventaret vet å toggle en klasse 'none' som bare har display: none i seg
function toggleDisplay(id) {
    document.getElementById(id).classList.toggle("none");
};

// Her definerer vi lister (arrays) som skal inneholde items i inventarene, og også hvilke bilder som skal være inni hver rute
let inventory_left      = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; // length = 16
let inventory_right     = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; // length = 16

let inventoryLeftImg    = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
let inventoryRightImg   = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

let left_IDs    = ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15"];
let right_IDs   = ["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15"];

// Oppdaterer inventaret visuelt på siden
function updateInventory() {
    for (let i = 0; i < inventory_right.length; i++) { // Looper gjennom koden under like mange ganger som vi har slots i inventaret
        let element = document.getElementById(right_IDs[i]);
        element.innerHTML = inventory_right[i];
        if (inventoryRightImg[i] != null) {
            element.style.backgroundImage = `url('img/${inventoryRightImg[i]}')`
            element.classList.add("has-item");
        } else {
            element.style.backgroundImage = "none";
            element.classList.remove("has-item");
        };
    };
    for (let i = 0; i < inventory_left.length; i++) { // Looper gjennom koden under like mange ganger som vi har slots i inventaret
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

// Liste med mulige items
const ITEMS = [
    "Sword", //
    "Shield", //
    "Health Potion", //
    "Mana Potion",
    "AK-47", //
    "RPG", //
    "Fishing Rod",
    "Duct Tape", //
    "Rope", //
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

//Genererer et tilfeldig nummer mellom det minimale og maksimale nummeret
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//Genererer tilfeldige items som da legges til i inventaret på høyresiden
function generateRandomItems() {
    for (let i = 0; i < inventory_right.length; i++) {
        let random = getRandomNumber(0, 32);
        if (random <= 10) {
            inventory_right[i] = ITEMS[random];
            inventoryRightImg[i] = IMAGES[random];
        } else {
            inventory_right[i] = null;
            inventoryRightImg[i] = null;
        };
    };
    updateInventory();
};

// Flytter et item fra elementet du klikket på til den andre boksen
function moveItem(element, slot) {
    if (element.parentNode.id == "right") {
        for (let i = 0; i < inventory_left.length; i++) {
            if (inventory_left[i] === null || inventory_left[i] === "") {
                inventory_left[i] = element.innerHTML;
                inventory_right[slot] = null;
                inventoryLeftImg[i] = inventoryRightImg[slot];
                inventoryRightImg[slot] = null;
                updateInventory();
                return;
            };
        };
    }else {
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

//Flytter alt fra høyre side inn til inventaret
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

//Fjerner alle items
function clearAll() {
    inventory_left      = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    inventory_right     = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    inventoryLeftImg    = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    inventoryRightImg   = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    updateInventory();
}

/*

    -- TODO LIST --

Images for the items inside the inventory -DONE!

*/