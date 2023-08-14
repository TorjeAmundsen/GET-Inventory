
function toggleDisplay(id) {
    document.getElementById(id).classList.toggle("none");
};

let inventory = [null, null, null, "fish", null, null, "football", null, null, null, null, null, null, null, null, null] // lenght = 16
let IDs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]

function updateInventory() {
    for (let i = 0; i < inventory.length; i++) { // for (variabel ; stop condition ; i++)
        document.getElementById(IDs[i]).innerHTML = inventory[i];
    };
};

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
    "Strawberry"
];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function generateRandomItems() {
    for (let i = 0; i < inventory.length; i++) {
        let random = getRandomNumber(0, 32);
        if (random <= 9) {
            inventory[i] = ITEMS[random];
        } else {
            inventory[i] = null;
        };
    };
    updateInventory();
};