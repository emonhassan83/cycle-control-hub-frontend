### Cycle Control Hub

Cycle Control Hub is a platform designed for three roles: admin, seller, and buyer, allowing for various management activities. This project implements a comprehensive Bike Management Dashboard, providing tools to efficiently manage bike inventory, track sales, and analyze sales history. It is built with React, MongoDB, Mongoose, Node.js, Tailwind CSS, Shadcn, Redux, Sonner, React Hook Form, and more.

![Dashboard Screenshot](https://i.ibb.co/L1QLZQ2/bike-app.png)

## Main Features

### Admin
- **Bike Management:**
  - Add new bikes
  - View all sold bikes
  - Delete and update bikes
  - View sales history categorized by:
    - Weekly
    - Daily
    - Monthly
    - Yearly
- **User Management:**
  - Change user roles
  - Delete users
- **Coupon Management:**
  - Create coupons for service discounts
  - Update and delete coupons
- **Service Management:**
  - Create service categories for bike servicing
  - Assign and delete coupons within service categories
  - Confirm and deny service requests

### Seller
- **Sales Management:**
  - Sell bikes
  - View and manage sales history categorized by:
    - Weekly
    - Daily
    - Monthly
    - Yearly
- **Bike Management:**
  - Add new bikes
  - View and manage personal bike inventory
  - Bulk delete bikes
- **Maintenance and Servicing Management:**
  - Confirm or deny service requests
  - View service history for all bikes

### Buyer
- **Bike Purchasing:**
  - View and search available bikes
  - Confirm or cancel bike purchases
  - View purchase history
- **Maintenance and Servicing:**
  - Request maintenance for bikes
  - Manage service requests (update, pay, delete, and add coupons)
  - View service history

## Main Issues
- Currently, there are no major issues.

## Future Features
1. Use React skeleton for UI shifting.

## Other Features
- User authentication (login and register)
- Private routes

## ReactJS Default Guide (Updated)

This is a [vitejs.dev](https://vitejs.dev/) project bootstrapped with [vite-react-app](https://github.com/vitejs/vite).

## Getting Started

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-repo/cycle-control-hub.git
   cd cycle-control-hub

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

#### Debugging

1. Run the development server:

```bash
npm run dev
```

2. Then run `Launch Chrome against localhost` in `Run and Debug` tab in VSCode

 #### Project live site link: https://heartfelt-conkies-348a42.netlify.app/

## Learn More

This project utilizes [Google Fonts](https://fonts.google.com/) to automatically optimize and load Inter, a custom Google Font.

To learn more about React.js, consider exploring the following resources:

- [React.js Documentation](https://react.dev/learn) - Comprehensive documentation on React.js features and API.
- [Learn React.js](https://react.dev/learn) - An interactive tutorial for learning React.js.

For contributing or providing feedback, visit the [React.js GitHub repository](https://github.com/reactjs/react.dev).

This template offers a minimal setup to get React working with Vite, Hot Module Replacement (HMR), and some ESLint rules.

### Official Plugins

Currently, two official plugins are available for enhancing the development experience:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utilizes [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Utilizes [SWC](https://swc.rs/) for Fast Refresh.

### Expanding the ESLint Configuration

For production applications, we recommend updating the ESLint configuration to enable type-aware lint rules:

1. Configure the top-level `parserOptions` property as follows:

    ```js
    export default {
      // other rules...
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    }
    ```

2. Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.

3. Optionally, add `plugin:@typescript-eslint/stylistic-type-checked` for additional stylistic rules.

4. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` and `plugin:react/jsx-runtime` to the `extends` list.