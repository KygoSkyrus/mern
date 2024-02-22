# Shopp-Itt
> Shopp-Itt: Explore a diverse range of cutting-edge gadgets and appliances. Shop securely, effortlessly and Elevate your tech experience with us!


### OverView
Shopp-Itt is a feature-rich e-commerce application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The application specializes in electronic products and boasts over 25 categories. It provides a seamless shopping experience with essential features such as a shopping cart, wishlist, user account, and order management.  
Shopp-Itt includes a comprehensive admin panel with various [features](#admin_features) for managing the application effectively.


[comment]: add_badges,_screenshots_gifs_details_about_app__THINGS_THAT_CAN_BEIMPLEMENTED_WRITE_THE_IN_CONTRIBUTE_LIKE_COMMENT_FEATURE
[comment]: add_firebase_info,setup_refreence
[comment]: evolved_FROM:https://shopp-itt.onrender.com


### Features
- **User Authentication**:
  - **Email-Password Login**: Users can register and log in using their email and password.
  - **Google Account Login**: Seamless authentication is offered through Google accounts for a convenient login experience.

- **User Features**:
  - User accounts with profile management.
  - Browse products by category.
  - Wishlist functionality to save favorite products.
  - Shopping cart for easy checkout.
  - Order history and order receipt generation.
  - Quick and dynamic search bar for efficient product search.

- **Product Categories**: 
  - Shopp-itt covers a diverse range of electronic products with over 25 categories to choose from.

- **Admin Panel**: The admin panel provides facilities for: <a name="admin_features"></a>
  - Secure admin panel for managing products and users.
  - Actions include adding, editing, and deleting products.
  - View orders placed by users.
  - List of registered users.

  - **Guest mode**: 
    - Guest mode is introduced to let users explore the admin panel.
    - *NOTE*: Guest user has `view only` permission in admin panel that's why user won't be able to perform any of the above mentioned admin actions.



### Tech Stack
- **Frontend**:
  - **React**: A powerful JavaScript library for building user interfaces.
  - **Redux**: State management for React applications.
  - **Firebase**: Authentication and Cloud Storage for efficient image handling.

- **Backend**:
  - **Node.js**: Server-side JavaScript runtime.
  - **Express.js**: Web application framework for Node.js.
  - **MongoDB**: NoSQL database for flexible and scalable data storage.
  - **JWT**: JSON Web Tokens for secure session management.

- **Payment Processing**:
  - **Stripe**: A reliable and secure payment gateway for online transactions.



### Installation

Follow these steps to set up Shopp-Itt locally:

1. Clone or download the repository and go to the server from root folder
2. Install dependencies for the server and client:

- for server run this command from the _root_ folder and for client run the command from the _client_ folder

```bash
npm install
```

3. Set up the MongoDB database. Update the connection string in `env/config.env`
4. Set environment variables for sensitive information such as API keys or database credentials.
5. Start the server and client:

```bash
# to start server
npm run dev

# to start client
cd ../client
npm run start
```

### Usage

1. Visit http://localhost:3006 in your browser.
2. Users can sign up, create their account, add items to cart/wishlist, place orders.
3. Admins can access the admin panel by navigating to http://localhost:3006/admin/dashboard. The guest admin credentials are provided in the admin panel login.

### Contributing 🤝

Contributions to Shopp-Itt are welcome! Please follow the guidelines in the [CONTRIBUTING.md](https://github.com/KygoSkyrus/mern/blob/v2/CONTRIBUTING.md) file.
Feel free to check [issue page](https://github.com/KygoSkyrus/mern/issues)

### Show your support

Give a ⭐ if this project helped you!

### Acknowledgments

- Shopp-Itt utilizes the MERN stack and various open-source libraries. See the package.json files for details.


### License
[MIT License](https://github.com/KygoSkyrus/mern/blob/v2/LICENSE) © Shopp-Itt


### Demo
![Preview](https://github.com/KygoSkyrus/mern/blob/v2/shoppitt-preview.gif)

> Live at [Shopp-Itt by Dheeraj Gupta](https://shoppitt.onrender.com)