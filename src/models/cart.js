module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
        }

        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;


    };
    this.add5 = function(item, id) {
        var i;
        for (i = 0; i < 5; i++) {
            var storedItem = this.items[id];
            if (!storedItem) {
                storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
            }

            storedItem.qty++;
            storedItem.price = storedItem.item.price * storedItem.qty;
            this.totalQty++;
            this.totalPrice += storedItem.item.price;
        }

    };






    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.reduceByFive = function(id) {
        var i;
        this.items[id].qty = this.items[id].qty - 5;
        for (i = 0; i < 5; i++) {
            this.items[id].price -= this.items[id].item.price;
            this.totalPrice -= this.items[id].item.price;
        }
        this.totalQty = this.totalQty - 5;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
            this.totalQty = 0;
        }
    };
    this.removeAll = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};