const router = require('express').Router();
const { response } = require('express');
const yahooFinance = require('yahoo-finance2').default;
const { User, Stock } = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.render('/');
    return;
  }
  res.render('login');
});

router.get('/about', withAuth, (req, res) => {
  res.render('about', {
    logged_in: true,
  });
});

router.get('/', async (req, res) => {
  let stocks = [];
  let symbols = ['AAPL', 'AMZN', 'GOOG', 'SNAP'];
  await Promise.all(symbols.map(async (symbol) => await getInfo(symbol)));
  async function getInfo(stock) {
    const quote = await yahooFinance.quote(stock);
    const price = quote.regularMarketPrice;
    const rating = quote.averageAnalystRating;
    stocks.push({ symbol: stock, price: price, rating: rating });
  }
  res.render('homepage', {
    stocks,
    logged_in: req.session.logged_in,
  });
});

router.get('/price', withAuth, async (req, res) => {
  const symbol = req.query.symbol;
  const quote = await yahooFinance.quote(symbol);
  if (quote === undefined) {
    return res.status(404).send('Not found');
  } else {
    res.send({
      symbol: symbol,
      price: quote.regularMarketPrice,
    });
  }
});

router.get('/status', withAuth, async (req, res) => {
  const symbol = req.query.symbol;
  const quote = await yahooFinance.quote(symbol);
  if (quote === undefined) {
    return res.status(404).send('Not found');
  } else {
    res.send({
      symbol: symbol,
    });
  }
});

const addPriceToStock = async (stock) => {
  const quote = await yahooFinance.quote(stock.symbol);
  stock.price = quote.regularMarketPrice;
  stock.total = (quote.regularMarketPrice * stock.shares).toFixed(2);
  return stock;
};

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Stock }],
    });

    const user = userData.get({ plain: true });
    const stocks = await Promise.all(
      user.stocks.map(async (stock) => await addPriceToStock(stock))
    );

    res.render('dashboard', {
      stocks,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

module.exports = router;
