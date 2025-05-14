# Лабораторная работа №3 `Cavarnali Anastasia IA2403`
## Запуск проекта:
- Открытие файла `index.html`
- Открытие консоли браузера, чреез `F12` или `контекстное меню->код элемента`

# Цель работы
Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование.

# Условие
Создать  консольное приложение, моделирующее систему инвентаря, где можно добавлять предметы, изменять их свойства и управлять ими.

## Шаг 1. Создание класса `Item`
Создать класс Item, который будет представлять предмет в инвентаре.

### Поля класса:
- `name` – название предмета.
- `weight` – вес предмета.
- `rarity` – редкость предмета (common, uncommon, rare, legendary).
### Методы:
- `getInfo()` – возвращает строку с информацией о предмете.
- `setWeight(newWeight)` – изменяет вес предмета.

```js
/**
 * Класс, представляющий предмет в инвентаре.
 */
class Item {
  /**
   * Конструктор для создания нового предмета.
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
   * Получает информацию о предмете.
   * @returns {string} Информация о предмете.
   */
  getInfo() {
    return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Устанавливает новый вес предмета.
   * @param {number} newWeight - Новый вес.
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
```

## Шаг 2. Создание класса `Weapon`
Создать класс Weapon, который расширяет Item.

### Дополнительные поля:
- `damage` – урон оружия.
- `durability` – прочность (от 0 до 100).
Методы:
- `use()` – уменьшает durability на 10 (если `durability` > 0).
- `repair()` – восстанавливает durability до 100.

```js
/**
 * Класс, представляющий оружие (наследуется от Item).
 */
class Weapon extends Item {
  /**
   * Конструктор для создания нового оружия.
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес оружия.
   * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity - Редкость оружия.
   * @param {number} damage - Урон оружия.
   * @param {number} durability - Прочность оружия.
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие (уменьшает прочность на 10).
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    }
  }

  /**
   * Ремонтирует оружие (восстанавливает прочность до 100).
   */
  repair() {
    this.durability = 100;
  }

  /**
   * Получает информацию об оружии.
   * @returns {string} Информация о оружии.
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}
```
## Шаг 3. Тестирование
1. Создайть несколько объектов классов Item и Weapon.
2. Вызвать их методы, чтобы убедиться в правильности работы.

```js
// Шаг 3. Тестирование

// Создаем несколько предметов
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());  // Информация о предмете

const shield = new Item("Shield", 5.0, "common");
console.log(shield?.getInfo());  // Информация о щите

const axe = new Weapon("Battle Axe", 6.0, "rare", 25, 80);
console.log(axe?.getInfo());  // Информация о топоре

axe.use();
axe.use();  // Используем топор дважды
console.log(`Axe durability after use: ${axe?.durability}`);

axe.repair();  // Ремонтируем топор
console.log(`Axe durability after repair: ${axe?.durability}`);
```

## Шаг 4. Дополнительное задание
1. Опциональная цепочка (?.) – использовать ее при доступе к свойствам объекта, чтобы избежать ошибок.
2. Создание функции-конструктора:
    - Переписать классы Item и Weapon, используя функции-конструкторы вместо class.

```js
// Шаг 4. Дополнительное задание

// Функция-конструктор Item
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

// Методы для Item
ItemFunc.prototype.getInfo = function () {
  return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

// Функция-конструктор Weapon
function WeaponFunc(name, weight, rarity, damage, durability) {
  // Вызов конструктора Item
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

// Наследование от ItemFunc
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

// Методы для Weapon
WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;
    if (this.durability < 0) this.durability = 0; // не даем прочности быть меньше 0
  }
};

WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};

WeaponFunc.prototype.getInfo = function () {
  return `${ItemFunc.prototype.getInfo.call(this)}, Damage: ${this.damage}, Durability: ${this.durability}`;
};

// Шаг 4. Тестирование с функциями-конструкторами

// Создаем несколько предметов с использованием функции-конструктора
const swordFunc = new ItemFunc("Steel Sword (Func)", 3.5, "rare");
console.log(swordFunc?.getInfo());  // Информация о предмете через функцию-конструктор

const shieldFunc = new ItemFunc("Shield", 5.0, "common");
console.log(shieldFunc?.getInfo());  // Информация о щите через функцию-конструктор

const axeFunc = new WeaponFunc("Battle Axe", 6.0, "rare", 25, 80);
console.log(axeFunc?.getInfo());  // Информация о топоре через функцию-конструктор

axeFunc.use();
axeFunc.use();  // Используем топор дважды
console.log(`Axe durability after use: ${axeFunc?.durability}`);

axeFunc.repair();  // Ремонтируем топор
console.log(`Axe durability after repair: ${axeFunc?.durability}`);
```

## Контрольные вопросы
1. Какое значение имеет `this` в методах класса?

    **Ответ:** В методах класса `this` ссылается на текущий экземпляр объекта, к которому принадлежит метод. Это позволяет обращаться к свойствам и методам объекта внутри самого класса.

2. Как работает модификатор доступа # в JavaScript?

    **Ответ:** `Модификатор #` делает свойства и методы класса приватными. Они доступны только внутри класса, и не могут быть напрямую доступны извне.

3. В чем разница между классами и функциями-конструкторами?

    **Ответ:**
    - `Классы` — это синтаксический сахар, введенный в ES6, который является более удобным способом создания объектов и работы с наследованием.

    - `Функции-конструкторы` — это более старый способ создания объектов, до появления классов в ES6. Они используются с помощью ключевого слова new, чтобы создавать экземпляры объектов.

## Использованные источники
- [MoodleUSM](https://moodle.usm.md/course/view.php?id=6455)
- [JavaScript.ru](https://learn.javascript.ru)
- [GitHub](https://github.com/MSU-Courses/javascript/blob/main/lab/lab_guidelines.md)
- [ChatGPT](https://chatgpt.com/)
- [DeepSeek](https://chat.deepseek.com/)