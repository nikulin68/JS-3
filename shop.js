class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;        
    }
    setAvailable() {
        return this.available = true;
    }
}

class GoodsList {
    #goods = []      
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list(){                
        let productList = this.#goods.filter(good => this.filter.test(good.name));
        if(!this.sortPrice) {
            return productList;
        }
        if (this.sortDir) {
            return productList.sort((x, y) => (x.price - y.price));
        }
        return productList.sort((x, y) => (y.price - x.price));

    }

                   
    add(newGood) { 
        this.#goods.push(newGood);
        let result = this.#goods;
        return result;
    }

    remove(id) {
        let delProduct = this.#goods.findIndex(good => good.id === id);
        if (delProduct != undefined) {
            this.#goods.splice(delProduct, 1);
        }
        return delProduct
    }

    filterAvailable () { 
        const result = this.#goods.filter(good => good.available === true)
        return result;
    }
}

class BasketGood extends Good {
    constructor(currentGood, amount) {
        super(currentGood);
        this.amount = amount;
        this.id = currentGood.id;
        this.name = currentGood.name;
        this.sizes = currentGood.sizes;
        this.price = currentGood.price;
        this.available = currentGood.available;
    }
}
class Basket {
    constructor() {
        this.goods = [];
    }
    get totalAmount() {
        let allProducts = this.goods.reduce(function(totalSum, good) {
            return totalSum + good.amount}, 0);
        return allProducts
    }

    get totalSum() {
        let allPrice = this.goods.reduce(function(totalAmount, good){
            return totalAmount + good.amount * good.price;}, 0)
        return allPrice

    }

    add (good, amount) {
        if (!(typeof amount === "number")) {
          throw new Error("Введите количество");
        }
        if (amount < 0) {this.remove(good, amount)
        }
        else {
        let trigger = false
        for (let index = 0; index < this.goods.length; index++) {
            if (this.goods[index].id === good.id) {
                this.goods[index].amount = this.goods[index].amount + amount
                trigger = true
                break
            }
        }
        if (trigger === false) {
            this.goods.push(good)
            } 
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            }
            else {
                this.goods[index].amount -= amount;
            }
        }
    }

    clear () {  
        this.goods.splice(0, this.goods.length)
    }
    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true);
        return this.goods;
    }
}

const good1 = new Good(1, 'Куртки', 'Куртки кожаные', ['S', 'M', 'ХL'], 21500, false);
const good2 = new Good(2, 'Головные Уборы', 'Бейсболки', ['XS', 'L', 'XXL'], 300, true);
const good3 = new Good(3, 'Рубашки', 'Фланелевые', ['M', 'L', 'XL'], 1000, true);
const good4 = new Good(4, 'Туфли', 'Демисезонные', ['41', '42', '44.5'], 1500, true);
const good5 = new Good(5, 'Жилетки', 'Шерстяные', ['46', '52', '56'], 5000, true);

const goodsAll = [];
goodsAll.push(good1);
goodsAll.push(good2);
goodsAll.push(good3);
goodsAll.push(good4);

const newCatalog = new GoodsList(goodsAll, /Головные Уборы/i, true, true);

const newBasketGood1 = new BasketGood(good1, 3);
const newBasketGood2 = new BasketGood(good2, 5);
const newBasketGood3 = new BasketGood(good3, 2);
const newBasketGood4 = new BasketGood(good4, 7);
console.log(newBasketGood1)

const newBasket = new Basket();

good2.setAvailable();
console.log(good2.available);
console.log(newCatalog.list);
console.log(newCatalog.add(good5));
console.log(newCatalog.remove(undefined));
console.log(newCatalog.filterAvailable());

newBasket.add(newBasketGood3, newBasketGood3.amount);
console.log(newBasket);

newBasket.add(newBasketGood3, 10);
console.log(newBasket)

console.log(`Общее количество товаров в корзине: `, newBasket.totalAmount);
console.log(`Общая сумма в корзине: `, newBasket.totalSum);

newBasket.clear();
console.log(newBasket);

newBasket.removeUnavailable();
console.log(newBasketGood1.amount);


