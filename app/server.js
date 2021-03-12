const express = require('express');
const axios = require('axios');
const config = require('./config.js');
const utils = require('../utils/index.js');
const authorMiddleware = require('../middlewares/authorMiddleware.js');

const app = express();               

app.use(authorMiddleware);

app.get('/api/items', async (req, res) => {
    const { q, } = req.query;
    const searchEndpoint = `${config.API_URL}/sites/MLA/search?q=${q}&&limit=4`;
    const response = await axios.get(searchEndpoint);
    const { status, statusText, data, } = response;
    if(status === 200) {
        // categories are extracted
        let categories = [];
        if(data.filters[0]) {
            categories = data.filters[0].values[0].path_from_root;
        }
        const items = data.results.map(item => utils.buildItem(item));
        const formattedData = utils.buildData(res.author, categories, {items});
        res.json(formattedData);
    } else {
        res.status(status).json({statusText});
    }
});

app.get('/api/items/:id', async (req, res) => {
    const { id, } = req.params;
    const detailEndpoint = `${config.API_URL}/items/${id}`;
    const itemDetailResponse = await axios.get(detailEndpoint);
    const { status, statusText, data, } = itemDetailResponse;
    if(status === 200) {
        const categoriesEndpoint = `${config.API_URL}/categories/${data.category_id}`;
        const descriptionEndpoint = `${detailEndpoint}/description`;
        axios.all([
            axios.get(categoriesEndpoint),
            axios.get(descriptionEndpoint)
        ]).then(axios.spread((response1, response2) => {
            const { data: fullCategory, } = response1;
            const { plain_text: description } = response2.data;
            const item = {
                ...utils.buildItem(data),
                sold_quantity: data.sold_quantity,
                description,
            };
            const formattedData = utils.buildData(res.author, fullCategory.path_from_root, {item});
            res.json(formattedData);
        })).catch(error => {
            const { status, statusText } = error.response;
            res.status(status).json({statusText});
        });
    } else {
        res.status(status).json({statusText});
    }  
});

app.listen(config.PORT);

console.log(`Api listening on port ${config.PORT}`);