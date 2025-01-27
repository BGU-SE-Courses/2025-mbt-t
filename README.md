# Software Quality Engineering - System Testing
This is a repository for the system-testing assignment of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called [PrestaShop](https://demo.prestashop.com/#/en/front).

PrestaShop is an open-source e-commerce platform designed for building and managing online stores. It offers a user-friendly interface for managing products, customers, orders, and payments, making it accessible for diverse users.

## Installation

1. Download PrestaShop.
2. Set up a local server environment.
3. Configure local database - user data and coupon data.
4. Install any Java IDE + JDK.
5. Configure maven dependencies in pom.xml file - Selenium and Cucumber.
6. Download the correct version chromedriver according to your google chrome version and place it in the Selenium directory.

## What we tested

We tested the coupon module that allows for users to use coupons and admins to manage coupons. We chose to test the following user stories: 

*User story:* Customer uses a coupon that lowers the cost in the cart.

*Preconditions:* 

1. The customer is logged in.
2. The customer has a product in the cart.
3. The customer is on Payment Page with Promo code open.

*Expected outcome:* The coupon is applied and the cart total cost is lowered.

*User story:* Admin cancels the coupon.

*Preconditions:* 
1. The admin is logged in the system .
2. The admin is on the Cart Rules page within Catalog-Discounts
3. There is a coupon that we want to cancel.

*Expected outcome:* The coupon is disabled

## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a behavior-driven testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory. 
