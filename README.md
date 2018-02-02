#Bamazon Interactive Storefront

### Overview

An interactive storefront that runs in the console using node. This storefront in no way resembles Amazon, except in name.

This program consists of two separate, but related apps. The first, BamazonCustomer.js, allows a "customer" to place an order from the Bamazon store. First the customer is shown the inventory.
![inventory](https://github.com/coleve27/bamazon/blob/master/bamazon_sceenshots/customer_1.png)

The customer is prompted to select the item they would like to purchase by id and how many they would like to purachase.

![purchase](https://github.com/coleve27/bamazon/blob/master/bamazon_sceenshots/customer_2.png)
A check is then performed on the store inventory and the customer is either alerted that their order cannot be completed, or they are shown the total amount owed (but no credit card number is requested). Behind the scenes, the quantity ordered by the customer is deducted from the store quantity (which is stored in a SQL table).


BamazonManager.js allows managers to perform 5 functions which a store manager can select from a menu. The options are: view inventory, new low inventory, add items, add products, and quit. Using these options managers can keep the sql database up to date with their current inventory.

![menu](https://github.com/coleve27/bamazon/blob/master/bamazon_sceenshots/manager_1.png)

![menu 3](https://github.com/coleve27/bamazon/blob/master/bamazon_sceenshots/manager_3.png)

![menu 4](https://github.com/coleve27/bamazon/blob/master/bamazon_sceenshots/manager_4.png)
