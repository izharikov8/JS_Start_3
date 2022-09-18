class Good { 
    constructor (id, name, description, sizes, price, availible) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sizes = sizes;
    this.price = price;
    this.availible = availible
    }

    setAvailible (bool_status) {
        return this.availible = bool_status
    }
}

class GoodsList {
    #goods = []

    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        
        let filteredList = this.#goods.filter(good => this.filter.test(good.name) === true)
         
        if (this.sortPrice === true) {
            if (this.sortDir === true) {
                return filteredList.sort( (a, b) => a.price - b.price)
            }
            if (this.sortDir === false) {
                return filteredList.sort( (a, b) => b.price - a.price)
            }
        }
        else {return filteredList}
    }

    add(good) {
        this.#goods.push(good)
        return this.#goods
    }

    remove(id) {
        let idx = this.#goods.findIndex(good => good.id === id)
        this.#goods.splice(idx, 1)
        return this.#goods
    }
}

class BasketGood extends Good {
    constructor (good, amount) {
        super(good)
        this.id = good.id
        this.name = good.name
        this.sizes = good.sizes
        this.price = good.price
        this.availible = good.availible
        this.amount = amount
    }
}

class Basket {
    constructor() {
        this.goods = []
    }

    get totalAmount() {
        let result = this.goods.reduce(function(totalAmount, good) {
        return totalAmount + good.amount * good.price}, 0)
        return result
    }

    get totalSum() {
        let result = 0
        this.goods.forEach(good => result += good.amount)    
        return result
    }

    add (good, amount) {
        let trigger = false
        for (let idx = 0; idx < this.goods.length; idx++) {
            if (this.goods[idx].id === good.id) {
                this.goods[idx].amount = this.goods[idx].amount + amount
                trigger = true
                break
            }
        }
        if (trigger === false) {
            this.goods.push(good)
            }  
    }

    remove (good, amount) {
        for (let index = 0; index < this.goods.length; index++) {          
            if (this.goods[index].id === good.id) {
                this.goods[index].amount = this.goods[index].amount - amount;   
                }
            if (this.goods[index].amount <= 0) {
                this.goods.splice(index, 1);
                }
    }
    }

    clear () {
        this.goods.splice(0, this.goods.length)
    }

    removeUnavailible() {
        this.goods = this.goods.filter(good => good.availible === true)
        return this.goods;
    }
}


//Проверка
const good1 = new Good (
    1,
    'Столб',
    'Железный столб',
    ['1m', '2m', '3m'],
    1000,
    true,
    );

const good2 = new Good (
    2,
    'Забор',
    'Деревянный забор',
    ['10m', '20m', '30m'],
    8000,
    true
    );

const good3 = new Good (
    3,
    'Провод',
    'Провод витой 3 фазы',
    ['10m', '20m', '30m'],
    2000,
    true
    );

const good4 = new Good (
    4,
    'Молоток',
    'Стальной молоток',
    ['20сm'],
    500,
    false
    );

const good5 = new Good (
    5,
    'Шуруповерт',
    'Аккумуляторный шуруповерт',
    [],
    4500,
    false
    );

const good6 = new Good (
    6,
    'Пила',
    'Электрическая пила',
    ['40cm', '50cm'],
    5000,
    false
    );

const goodsAll = []
    goodsAll.push(good1)
    goodsAll.push(good2)
    goodsAll.push(good3)
    goodsAll.push(good4)
    goodsAll.push(good5)


let regexp  = /Пила|Молоток|Шуруповерт|Столб|Забор|Провод/i
const newCatalogue = new GoodsList(goodsAll, regexp, true, true)


good5.setAvailible(true) // setAvailible - работает
console.log(goodsAll)
console.log(newCatalogue)
newCatalogue.add(good6) // add у GoodList - работает
console.log(newCatalogue.list) // list у GoodList - работает
newCatalogue.remove(6) // remove у GoodList - работает
console.log(newCatalogue.list)

const basket1 = new BasketGood(good1, 10)
const basket2 = new BasketGood(good2, 10)
const basket3 = new BasketGood(good6, 10)

const newBasket = new Basket()


newBasket.add(basket1, basket1.amount) // add у Basket - работает
newBasket.add(basket2, basket2.amount)
newBasket.add(basket3, basket3.amount)
newBasket.add(basket1, 7)
newBasket.remove(basket1, 16) // remove у Basket - работает

console.log(newBasket)
console.log(newBasket.totalAmount) // totalmount - работает
console.log(newBasket.totalSum) // totalSum - работает

newBasket.removeUnavailible() // removeUnalaible - работает
console.log(newBasket)

newBasket.clear() // clear - работает
console.log(newBasket)