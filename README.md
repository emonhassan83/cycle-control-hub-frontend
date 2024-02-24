# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

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

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# l2b2-full-stack-a5-client-side-emonhassan83

Cycle Control Hub is a website for a user that allows to user add, update, delete, buy bikes management activities. This project implement a comprehensive Bike Management Dashboard, providing the tools to efficiently manage the bike inventory, track sales, and analyze sales history. It is built with React, MongoDB, Mongoose, NodeJS, Tailwind css, shadcn, Redux, sonner, react-hook-form and etc.

### Main Features
- [x] USER can
  - [x] Add new bike
  - [x] Purchase the bike
  - [x] View all bike purchase bike
  - [x] Purchase cancel the bike
  - [x] Also Delete, update this bike
  - [x] Manage Bikes
  - [x] View users all Bikes
  - [x] View login user all Bikes
- [x] View sales history categorized by:
  - [x] Weekly
  - [x] Daily
  - [x] Monthly
  - [x] Yearly
- [x] Bike Filtering (Implement on the bike management page)

### Main Issues
* In this time there have no major issues.

### Future Features
1. Use React skeleton for UI shifting

### Other Features
  - [x] User authentication(login and register)
  - [x] Private Route

### ReactJS Default Guide (Updated)

This is a [vitejs.dev](https://vitejs.dev/) project bootstrapped with [`vite-react-app`](https://github.com/vitejs/vite).


### Getting Started

#### Setup

1. Clone the repo

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

### Learn More

This project uses [`google/font`](https://fonts.google.com/) to automatically optimize and load Inter, a custom Google Font.

To learn more about React.js, take a look at the following resources:

- [React.js Documentation](https://react.dev/learn) - learn about React.js features and API.
- [Learn React.js](https://react.dev/learn) - an interactive React.js tutorial.

You can check out [the React.js GitHub repository](https://github.com/reactjs/react.dev) - your feedback and contributions are welcome!

 #### Project live site link: https://heartfelt-conkies-348a42.netlify.app/ ##### l2-b2-assignment-6-fronten-emonhassan83
