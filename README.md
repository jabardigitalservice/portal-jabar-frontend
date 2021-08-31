# Portal Jabar

This is the main codebase of Portal Jabar website.

## Docs

- [Codebase](#codebase)
  - [Technologies](#technologies)
  - [Folder Structure](#folder-structure)
- [First time setup](#first-time-setup)
  - [Installation](#installation)
- [Running locally](#running-locally)

## Codebase

### Technologies

Here is a list of all the core technologies this project use:
- [npm](https://www.npmjs.com/): Package manager
- [Tailwind CSS](https://tailwindcss.com/): CSS framework for styling
- [Vue.js](https://vuejs.org/): JavaScript framework for building user interfaces
- [NuxtJS](https://nuxtjs.org/): Vue.js framework for server-side rendering

### Folder structure

```bash
portal-jabar-frontend/
├── assets        # Uncompiled assets such as Stylus or Sass files, images, or fonts
├── components    # Vue.js components
├── layouts       # Custom layout accessible with the layout property in the page component
├── pages         # Application views and routes
├── static        # Static files
└── utils         # Reusable utility codes or functions
```

## First time setup

### Installation

Clone the repo

```bash
git clone https://github.com/jabardigitalservice/portal-jabar-frontend.git
```

Change directory

```bash
cd portal-jabar-frontend
```

Create env file

```bash
cp .env.example .env
```

Install the dependencies

```bash
npm install
```

## Running locally

Compiles and hot-reloads for development

```bash
npm run dev
```
