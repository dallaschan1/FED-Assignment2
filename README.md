# ZenCraft - The Ultimate Furniture Gaming Experience

## GitHub Issues: 
- Due to some unknown reasons, the github deployed website does not function as well as compared to a locally deployed webserver. We had little time to figure the issue and therefore this issue wasn't resolved.

## Overview

Welcome to ZenCraft, an innovative fusion of online shopping and gaming. Our platform isn't just another furniture store; it's a unique experience that combines the thrill of gaming with the convenience of online furniture shopping. Dive into our exclusive game, reminiscent of popular titles like Agar.io, Surviv.io, and Tank.io, where players battle enemies, overcome challenges, and earn discounts on our wide range of furniture products. With each milestone reached in the game, players unlock special discounts, making shopping not just rewarding but also incredibly fun. Join our community forum to discuss game strategies, furniture trends, or any customer service inquiries. At ZenCraft, we're more than just a store – we're an experience.

## Design Process

### Target Audience

Our website is designed for gamers who love to shop, furniture enthusiasts who enjoy a good game, and anyone looking to spice up their home with high-quality furniture while having fun. Whether you're here to decorate your space, share insights in the forum, or conquer the game for discounts, there's something for everyone.

### User Stories

- **As a gamer**, I want to play an engaging game where I can earn real-world rewards, so that I can enjoy my gaming time and save money on furniture.
- **As a shopper**, I want to explore a wide range of furniture within my budget, so that I can furnish my home with stylish and affordable pieces.
- **As a forum user**, I want to connect with a community, share my thoughts, and seek help, so that I can enhance my experience and resolve any issues.

### Design Artifacts

- Wireframes and mockups were created using Figma to outline the user interface and experience.
- User flow diagrams to map out the navigation and interaction throughout the website.

## Features

### Existing Features
- **Dynamic Web Page**: Contents such as products or cart-items are dynamically imported into the web-page.
- **Game Integration**: Engage in a thrilling game to earn discounts on furniture purchases.
- **Price Range Slider**: Allow users to input a price range using a slider to filter furniture products within their budget.
- **Product Category Selection**: Provide options for users to select product categories, enabling them to narrow down their search.
- **Community Forum**: A platform for users to discuss the game, furniture trends, or seek customer support.
- **Responsive Design**: Built with Bootstrap and custom CSS for a seamless experience across all devices.

### Features Left to Implement

- **Enhanced Game Levels**: Introduce new levels and challenges in the game for even greater rewards.
- **User Profile Customization**: Allow users to customize their profiles in the forum for a more personalized experience.
- **Payment Gateway Integration with Stripe API**: Validate user card details during checkout using Stripe API.
- **Google API Address Validator**: Validate user addresses during checkout using Google Maps API.
- **Review System for Products**: Allow users to leave reviews for products they have purchased.

## Technologies Used

- **HTML5, CSS3, and Vanilla JavaScript**: For building the core structure and dynamic interactions.
- **jQuery**: To simplify DOM manipulation and streamline JavaScript operations.
- **Bootstrap**: For responsive design and layout components.
- **Lottie Animation**: For engaging, lightweight animations during loading screens.
- **RestDB**: For efficient database management and API integration.
- **Figma**: Used for designing wireframes and mockups.

## Testing

### Manual Testing Scenarios

## Navigation and Checkout Testing

1. **Navigate through the site to test the user flow and interface.**
2. Click on any of the shop categories in the `index.html` should have transported you to the `shop.html` with the correct filtered category.
3. **Add items to the cart and verify:**
   - Deleting of cart items
   - Changing of cart items quantity
   - Cart items are still there when the cart is closed and opened again
4. Proceed to checkout with an empty cart and try to place an order. Verify that a relevant error message appears.
5. Proceed to checkout with a non-empty cart and try to place an order with all inputs valid. Verify that a success message appears.
6. Sent messages through the contact form to test its functionality and responsiveness.

### Known Issues

- **Game Mechanics**: Players may get stuck in obstacles due to knockback from enemy hits.
- **Image Upload Limitations**: High-quality images may cause issues during account creation or posting in the forum.
- **Database Reliability**: Occasional downtime with RestDB API can affect site functionality.
- **Lack of Image Resource**: Due to the lack of resources for the different product color variations, changing the product's color doesn't change the picture of the product to that of the same color.

## Credits
- Wireframe and design for the home page and the shop page was directly taken from https://www.figma.com/community/file/1299098199775509142

### Content

- The text for specific sections was adapted from source materials and original content created by the ZenCraft team.

### Media

- Game was originally created by ourselves

### Acknowledgements

- Inspired by popular .io games and the desire to blend gaming with online shopping, our project aims to create a unique and engaging experience for our users.

### Roles
- **Dallas**
   1. Game Page
   2. Forum Page
   3. Contact Us Page
   4. Login Page
   5. Create Page (Create Post)
   6. Post Page (Comment on a Post)

- **Ian**
   1. Index (Home) Page
   2. Shop Page
   3. Individual Product Modal Pop-Up (Within Index & Shop Page)
   4. Checkout Page
   5. Cart
