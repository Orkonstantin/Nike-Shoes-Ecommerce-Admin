# Nike Shoes E-commerce Admin Panel

This is a Next.js project for an ecommerce admin panel. It provides a user interface for managing products, orders, and categories.

## Project Description

The Ecommerce Admin Panel is designed to simplify the management of an ecommerce website. It offers a user-friendly interface for managing products, orders, and categories.  
This project is ideal for ecommerce store owners, administrators, and developers who want to streamline their backend operations.

## Features

- Product Management: Add, update, and delete products using the intuitive product management interface.
- Order Management: View and manage customer orders, including order details and status updates.
- Category Management: Create and manage product categories to organize your inventory effectively.

## Installation and Setup Instructions

To get started with the Ecommerce Admin Panel, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command:
    ```bash
    npm install
    ```
3. Copy the `.env` file and set up the necessary environment variables.
4. Start the development server by running the following command:
    ```bash
    npm run dev
    ```
5. Open http://localhost:3000 in your browser to access the admin panel.


## Components

The project includes several reusable components:

- [Layout](components/Layout.js): The main layout component.
- [Logo](components/Logo.js): The logo component.
- [Nav](components/Nav.js): The navigation component.
- [OrderCount](components/OrderCount.js): Displays the number of orders.
- [ProductCount](components/ProductCount.js): Displays the number of products.
- [ProductForm](components/ProductForm.js): A form for adding and updating products.
- [Spinner](components/Spinner.js): A spinner component for loading states.

## Libraries

The project uses the following libraries:

- [mongodb](https://www.npmjs.com/package/mongodb): For connecting to MongoDB.
- [mongoose](https://www.npmjs.com/package/mongoose): For modeling the application data.

## API Documentation

The Ecommerce Admin Panel exposes a RESTful API for integrating with other systems. The API endpoints and their request/response formats are documented below:

- `GET /api/products`: Retrieve a list of all products.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update an existing product.
- `DELETE /api/products/:id`: Delete a product.
- `GET /api/orders`: Retrieve a list of all orders.
- `PUT /api/orders/:id`: Update the status of an order.

## Acknowledgments

The product images and details used in this project are sourced from the official Nike website. I acknowledge and appreciate the high-quality images and detailed product descriptions provided by Nike.  
Please note that these images and product details are used for educational and illustrative purposes only.