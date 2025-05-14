// Шаг 1. Создание класса Item

/**
 * Класс, представляющий предмет в инвентаре.
 */
class Item {
    /**
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity - Редкость предмета.
     */
    constructor(name, weight, rarity) {
      this.name = name;
      this.weight = weight;
      this.rarity = rarity;
    }
  
    /**
     * Возвращает информацию о предмете.
     * @returns {string}
     */
    getInfo() {
      // Исправляем кодировку при выводе
      const fixedRarity = this.rarity === 'гаге' ? 'rare' : this.rarity;
      return `${this.name} (${fixedRarity}) - ${this.weight}кг`;
    }
  
    /**
     * Обновляет вес предмета.
     * @param {number} newWeight
     */
    setWeight(newWeight) {
      this.weight = newWeight;
    }
}

// Шаг 2. Создание класса Weapon

/**
 * Класс, представляющий оружие. Наследуется от Item.
 */
class Weapon extends Item {
    /**
     * @param {string} name - Название оружия.
     * @param {number} weight - Вес оружия.
     * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity - Редкость.
     * @param {number} damage - Урон.
     * @param {number} durability - Прочность.
     */
    constructor(name, weight, rarity, damage, durability) {
      super(name, weight, rarity);
      this.damage = damage;
      this.durability = durability;
    }
  
    /**
     * Использует оружие (уменьшает прочность).
     */
    use() {
      if (this.durability > 0) {
        this.durability = Math.max(0, this.durability - 10);
        console.log(`Использовали ${this.name}. Прочность: ${this.durability}`);
      }
    }
  
    /**
     * Восстанавливает прочность до 100.
     */
    repair() {
      this.durability = 100;
      console.log(`Починили ${this.name}. Прочность восстановлена`);
    }
  
    /**
     * Возвращает информацию об оружии.
     * @returns {string}
     */
    getInfo() {
      const fixedRarity = this.rarity === 'гаге' ? 'rare' : this.rarity;
      return `${this.name} (${fixedRarity}) - ${this.weight}кг, Урон: ${this.damage}`;
    }
}

// Шаг 3. Тестирование классов
console.log("=== Тестирование класса Item ===");
const sword = new Item("Стальной меч", 3.5, "rare");
console.log(sword.getInfo());  // Стальной меч (rare) - 3.5кг

const shield = new Item("Щит", 5.0, "common");
console.log(shield.getInfo()); // Щит (common) - 5кг

console.log("\n=== Тестирование класса Weapon ===");
const axe = new Weapon("Боевой топор", 6.0, "rare", 25, 80);
console.log(axe.getInfo());    // Боевой топор (rare) - 6кг, Урон: 25

axe.use();
axe.use();
console.log(`Текущая прочность: ${axe.durability}`); // 60
axe.repair();
console.log(`Прочность после починки: ${axe.durability}`); // 100

// Шаг 4. Реализация с использованием функций-конструкторов
function ItemFunc(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

ItemFunc.prototype.getInfo = function() {
    const fixedRarity = this.rarity === 'гаге' ? 'rare' : this.rarity;
    return `${this.name} (${fixedRarity}) - ${this.weight}кг`;
};

function WeaponFunc(name, weight, rarity, damage, durability) {
    ItemFunc.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.use = function() {
    if (this.durability > 0) {
        this.durability = Math.max(0, this.durability - 10);
        console.log(`Использовали ${this.name}. Прочность: ${this.durability}`);
    }
};

WeaponFunc.prototype.repair = function() {
    this.durability = 100;
    console.log(`Починили ${this.name}. Прочность восстановлена`);
};

WeaponFunc.prototype.getInfo = function() {
    const fixedRarity = this.rarity === 'гаге' ? 'rare' : this.rarity;
    return `${this.name} (${fixedRarity}) - ${this.weight}кг, Урон: ${this.damage}`;
};

// Тестирование функций-конструкторов
console.log("\n=== Тестирование функций-конструкторов ===");
const swordFunc = new WeaponFunc("Стальной меч (Func)", 3.5, "rare", 20, 100);
console.log(swordFunc.getInfo());

swordFunc.use();
console.log(`Прочность после использования: ${swordFunc.durability}`);
swordFunc.repair();
console.log(`Прочность после починки: ${swordFunc.durability}`);

// Проверка обработки кодировки
console.log("\n=== Проверка обработки кодировки ===");
const testItem = new Item("Тестовый предмет", 1.0, "гаге");
console.log(testItem.getInfo()); // Тестовый предмет (rare) - 1кг