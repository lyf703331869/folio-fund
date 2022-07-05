  # Portfolio Tracker
  ![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge&logo=appveyor)

  ## Description
  
  This application was designed to help users manage their portfolios. By conveniently placing owned stocks in one place, the user has a firmer grasp and understanding on their portfolio thus planning their financial future intelligently and with ease.
  
  ## Acceptance Criteria
  - The application is deployed to a public cloud so anyone can get to it.
  - As a new user to the application, the user is able to create a new user account.
  - As a user logs in to the application, the password must not be visible and shall be hashed. 
  - Once a user logs in, the application should give the user the ability to build up his/her own portfolio.
  - If the user's account already owns stock(s), as the user logs in, the dashboard should provide the user a doughnut-chart that shows all of the stocks in the account.
  - The doughnut-chart on the dashboard should be color-coded and has labels and hover-over effect to give the user a snapshot of what's in the account and how much.
  - The user should have the ability to choose what stock(s) he/she wants to purchase and how many shares.
  - The user should have the ability to sell the stock(s) from the portfolio.
  - When a user logs out, the user is taken to the login page where the user can login again.

  ## Dashboard Page
  <img width="1428" alt="image" src="https://user-images.githubusercontent.com/103960619/177423691-3e5e8d88-5ce1-4457-80b4-db9bd1785cac.png">

  
  ## Application Deployment
  Application is deployed to Heroku:  
  https://folio-fund.herokuapp.com/

 ## Usage Instruction
  1. Go to the landing page at https://folio-fund.herokuapp.com/.
  2. For new user, click on Register button on the top right to create an account.
  3. Fill out all of user information on the pop-up form and create account.
  4. Once logged in, user can purchase shares of stocks or funds by entering the ticker and quantity and click the Buy button on the dashboard page.
  5. After the account is funded with stock purchases, a doughnut-chart will be drawn with market value of each stock the user own.
  6. The user can sell the holding by entering the ticker and quantity and click the Sell button.  The doughnut chart will update accordingly.
  7. To logout, click on the Logout button at the top right, and the user will be brought to the login page.

  ## Contributors
  [Elliot Waxman](https://github.com/elliotzacharywaxman/) |
  [Yafei Liu](https://github.com/lyf703331869/) |
  [Destiny Henry](https://github.com/destinyhenry/) |
  [Shay O'Sulllivan](https://github.com/shayosullivan/)

  ## License & Credit
  [Bootstrap](https://getbootstrap.com/)  
  [Yahoo-finance](https://www.npmjs.com/package/yahoo-finance)  
  [ChartJS](https://www.chartjs.org/)
