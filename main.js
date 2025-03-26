/**
 * Class Item represents an inventory item.
 */
class Item {
    /**
     * Allowed rarity values.
     */
    static validRarities = ["common", "uncommon", "rare", "legendary"];

    /**
     * Creates an item.
     * @param {string} name - Item name.
     * @param {number} weight - Item weight.
     * @param {string} rarity - Item rarity (common, uncommon, rare, legendary).
     */
    constructor(name, weight, rarity) {
        if (!Item.validRarities.includes(rarity)) {
            throw new Error(`Invalid rarity value: ${rarity}`);
        }
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Returns a string with item information.
     * @returns {string}
     */
    getInfo() {
        return `${this.name} (Weight: ${this.weight}, Rarity: ${this.rarity})`;
    }

    /**
     * Updates the weight of the item.
     * @param {number} newWeight - New weight of the item.
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

/**
 * Class Weapon extends Item, representing a weapon.
 */
class Weapon extends Item {
    /**
     * Creates a weapon.
     * @param {string} name - Weapon name.
     * @param {number} weight - Weapon weight.
     * @param {string} rarity - Weapon rarity.
     * @param {number} damage - Weapon damage.
     * @param {number} durability - Durability (0 to 100).
     */
    constructor(name, weight, rarity, damage, durability) {
        if (!InRange(durability, 0, 100)) {
            throw new Error(`Invalid durability value: ${durability}. Durability must be in range (0 - 100)`);
        }
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Uses the weapon, decreasing its durability by 10.
     */
    use() {
        if (this.durability > 0) {
            this.durability = Math.max(0, this.durability - 10);
        }
    }

    /**
     * Repairs the weapon, restoring durability to 100.
     */
    repair() {
        this.durability = 100;
    }
}

// Testing classes
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(`Durability: ${bow.durability}`);
bow.repair();
console.log(`Durability after repair: ${bow.durability}`);

// Implementation using function constructors
/**
 * Function constructor for Item.
 */
function ItemFunc(name, weight, rarity) {
    const validRarities = ["common", "uncommon", "rare", "legendary"];
    if (!validRarities.includes(rarity)) {
        throw new Error(`Invalid rarity value: ${rarity}`);
    }
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
    this.getInfo = function () {
        return `${this.name} (Weight: ${this.weight}, Rarity: ${this.rarity})`;
    };
    this.setWeight = function (newWeight) {
        this.weight = newWeight;
    };
}

/**
 * Function constructor for Weapon, extending ItemFunc.
 */
function WeaponFunc(name, weight, rarity, damage, durability) {
    ItemFunc.call(this, name, weight, rarity);
    if (!InRange(durability, 0, 100)) {
        throw new Error(`Invalid durability value: ${durability}. Durability must be in range (0 - 100)`);
    }
    this.damage = damage;
    this.durability = durability;
    this.use = function () {
        if (this.durability > 0) {
            this.durability = Math.max(0, this.durability - 10);
        }
    };
    this.repair = function () {
        this.durability = 100;
    };
}

/**
 * Returns the X state in the interval A - B 
 * @param {number} x 
 * @param {number} a 
 * @param {number} b 
 * @returns {boolean}
 */
function InRange(x, a, b) {
    if (a <= x && x <= b) return true;
    return false;
}

// Testing function constructors with multiple cases
const axe = new WeaponFunc("Battle Axe", 5.0, "legendary", 25, 100);
console.log(axe.getInfo());
axe.use();
console.log(`Durability of the axe: ${axe.durability}`);
axe.repair();
console.log(`Durability of the axe after repair: ${axe.durability}`);

const club = new WeaponFunc("Wooden Club", 3.0, "common", 8, 80);
console.log(club.getInfo());
club.use();
console.log(`Durability of the club after use: ${club.durability}`);
club.repair();
console.log(`Durability after repair: ${club.durability}`);

const hammer = new WeaponFunc("War Hammer", 7.5, "uncommon", 30, 60);
console.log(hammer.getInfo());
hammer.use();
hammer.use();
console.log(`Durability after two uses: ${hammer.durability}`);
hammer.repair();
console.log(`Durability after repair: ${hammer.durability}`);