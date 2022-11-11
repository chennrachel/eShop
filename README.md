# eShop

This is my e-commerce shop website created using React!

Tech stack:

-   React
-   Javascript
-   React-router-dom
-   UseEffect, UseState, UseContext
-   Fetching data to Firebase/Firestore

Features:

-   Carousel of featured products
-   A grid of products
-   Individual product pages
-   Firestore database storing quantity, variants, price per unit, name, image url, favourited or not
-   Ability to favourite products and view all favourites on a page
-   Logic ensuring user isn't able to purchase above the quantity of stock available
-   Cart where users can remove products or increase/decrease quantity of products from cart

I had a lot of fun with this project. I think I gained a much better understanding of React. I made an active effort to try to make the components reusable so I could manipulate them to display different data depending on props and context. I feel much more confident understanding state and how to trigger component rerenders using useEffect, useContext and useState. Before this project, I felt like prop drilling was much more preferrable to useContext but I can now see how practical it is to pass the context around when dealing with multiple components.

I struggled a little with the structure of my Firebase/Firestore data. I originally stored variations of my products (different sizes, colours) inside the product as a subcollection. When it was structured like this, I was finding it difficult to display data from products with subcollections alongside those without. I was fetching multiple docs from different collection levels and then writing logic to determine which of the 2 should be displayed. The code was long and repetitive. To work around this, I restructured my firestore data so that relevant products had fields that indicated that they had variants. Those variants have their own separate document that references the base product id, which made mapping over them consistent to products without variants.

Features for the future:

-   Search bar for searching specific products/categories
-   Responsive menu bar for users on phones
-   Pagination of products in list
