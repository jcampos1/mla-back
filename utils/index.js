/**
 * Prepare the item
 * @param {Object} item is product
 */
const buildItem = item => ({
    id: item.id,
    title: item.title,
    price: {
        currency: item.currency_id,
        amount: item.price.toFixed(0),
        decimals: item.price % 1
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
});

/**
 * Prepare the data to return
 * @param {Object} author 
 * @param {Object} categories is used in breadcumb
 * @param {Array} items is a list items
 */
const buildData = (author, categories, items) => ({
    author,
    categories,
    ...items,
});

module.exports = {
    buildItem,
    buildData,
}