const router = require('express').Router();
const { quote } = require('yahoo-finance');
const yahooFinance = require('yahoo-finance');
const { User, Portfolio } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  let symbol;
  let symbols = ["AAPL", "AMZN", "GOOG", "SNAP",]
  let stocks = []
  for (let i = 0; i < symbols.length; i++) {
    callApi(symbols[i], i)
  }
  function callApi(symbol, i) {
    yahooFinance.quote(
      {
        symbol: symbol,
        modules: ['financialData'],
      },
      function (err, quotes) {
        if (quotes) {
          const price = quotes.financialData.currentPrice
          const recommendationKey = quotes.financialData.recommendationKey
          const ebitda = quotes.financialData.ebitda
          console.log(quotes.financialData)
          stocks.push({ "symbol": symbol, "price": price, "ebitda": ebitda, })
          console.log("this is our data", stocks)
          if (i === symbols.length - 1) {
            res.render("homepage", { stocks })
          }
        } else {
          return res.status(404).send('Not found');
        }
      }
    );
  }
});

router.get('/price', withAuth, (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) {
    return res.status(404).send('Not found');
  }
  yahooFinance.quote(
    {
      symbol: symbol,
      modules: ['financialData'],
    },
    function (err, quotes) {
      if (quotes && quotes.financialData && quotes.financialData.currentPrice) {
        res.send({
          symbol: symbol,
          price: quotes.financialData.currentPrice,
        });
      } else {
        return res.status(404).send('Not found');
      }
    }
  );
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Portfolio }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});
module.exports = router;
