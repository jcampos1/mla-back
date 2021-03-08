const authorMiddleware = (req, res, next) => {
    res.author = {
      name: 'Junior',
      lastname: 'Campos',
    };
    res.header('Access-Control-Allow-Origin', '*');
    next();
};
  
module.exports = authorMiddleware;