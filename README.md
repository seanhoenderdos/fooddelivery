# Food Delivery App

A mobile-first food delivery app built with Expo and React Native. This project was created as a practical upskilling project to stay current with React Native, Expo Router, mobile UI patterns, Appwrite integration, and cross-platform deployment.

Live preview: [seanhoenderdos-fooddelivery.expo.app](https://seanhoenderdos-fooddelivery.expo.app)

The web preview is presented inside a phone-style frame because the app was designed primarily for mobile screens.

## Overview

Food Delivery App lets users browse meals, search by category or keyword, view detailed product pages, customize orders with toppings and sides, and manage items in a cart. It is built to feel like a real mobile ordering flow, with authentication, menu data, product details, profile screens, and cart state.

## Features

- Email and password authentication with Appwrite
- Mobile-first Expo Router navigation
- Home screen with promotional food banners
- Search and category filtering that work together
- Product detail pages with ratings, delivery info, toppings, and side options
- Cart state with quantity controls and order totals
- Profile screen with customer details and logout flow
- Desktop web preview wrapped in a modern phone frame for portfolio use
- Expo web export and EAS Hosting deployment

## Tech Stack

- Expo SDK 53
- React Native 0.79
- React 19
- Expo Router
- TypeScript
- NativeWind and Tailwind CSS
- Zustand
- Appwrite
- EAS Hosting

## Getting Started

### Prerequisites

- Node.js
- npm
- Expo CLI through `npx expo`
- An Appwrite project with the required database collections configured

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
```

Start the development server:

```bash
npm start
```

Run on a specific platform:

```bash
npm run ios
npm run android
npm run web
```

## Build

Create a static web export:

```bash
npm run build
```

## Quality Checks

Run linting:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npx tsc --noEmit
```

## Project Notes

This project was intentionally used as a learning and sharpening exercise rather than just a static UI clone. The main focus areas were:

- Building a polished React Native interface with reusable components
- Working with Expo Router and typed routes
- Integrating Appwrite for authentication and menu data
- Managing cart behavior with Zustand
- Making the app presentable as a portfolio project through Expo web deployment

## Author

Built by [Sean Hoenderdos](https://github.com/seanhoenderdos).
