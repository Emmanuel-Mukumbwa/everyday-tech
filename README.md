<!--
	README for the Everyday Tech — Ecommerce Landing Page
	Replaced the default Create React App README with project-specific information.
-->

# Everyday Tech — Ecommerce Landing Page

> A lightweight React-based ecommerce landing page built as a storefront demo. It showcases products, product modals, a cart drawer, testimonials, and a checkout page — a good starting point for an online shop front-end.

---

## Key features

- Responsive landing page with product listing and product detail modal
- Add/remove items to a cart and view them in a slide-out cart drawer
- Toast notifications for user actions (add to cart, remove, checkout)
- Simple checkout page (front-end only) and product data driven from `src/data/products.js`
- Component-based structure for easy customization: `Navbar`, `Hero`, `ProductCard`, `ProductModal`, `CartWidget`, `CartDrawer`, `Testimonials`, `Footer`, etc.

## Tech stack

- React (Create React App)
- Plain CSS (project-level styles in `src/styles` and component CSS in `src`)
- No backend: demo uses local data in `src/data/products.js`

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm start
```

3. Open http://localhost:3000 in your browser. The app supports hot-reload when you edit files.

4. Create a production build

```powershell
npm run build
```

Notes:
- Tests: `npm test` (if present) will run the Create React App test runner.
- Eject: `npm run eject` is available but irreversible.

## Project structure (important files)

- `public/` — static assets and `index.html`
- `src/` — main app source
	- `App.js`, `index.js` — entry points
	- `assets/` — images and media
	- `components/` — UI components (CartDrawer, ProductCard, ProductModal, etc.)
	- `context/` — React contexts (`CartContext.js`, `ToastContext.js`)
	- `data/` — demo data (`products.js`)
	- `pages/` — route pages (`Home.js`, `Checkout.js`)
	- `styles/` — global and utility CSS

## How the app works (high level)

- The home page (`src/pages/Home.js`) renders the `Hero`, a product grid built from `src/data/products.js`, and other sections such as testimonials and footer.
- Clicking a product opens `ProductModal` (details + add to cart).
- Clicking the cart icon opens `CartDrawer` which reads and updates `CartContext`.
- `ToastContext` is used for short notifications (item added/removed).

## Customization ideas

- Hook up a backend API for product & cart persistence
- Add product categories, filters and search
- Add authentication and user accounts
- Replace demo product images with real assets

## Contributing

1. Fork the repo and create a feature branch
2. Make changes and add tests where appropriate
3. Open a pull request describing the change

Please keep changes small and focused. If you want to add a larger feature, open an issue first to discuss design.

## License

This repository is unlicensed by default. If you want to use an open-source license, consider adding an `LICENSE` file (for example `MIT`).

## Contact

If you have questions about the project, open an issue or contact the repository owner.

---

