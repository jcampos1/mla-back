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

const formatData = (author, categories, items) => ({
    author,
    categories,
    ...items,
});

module.exports = {
    buildItem,
    formatData,
}