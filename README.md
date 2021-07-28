# Portal Jabar Frontend

This is the main codebase of [West Java province official website](https://jabarprov.go.id/).

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
- [Tailwind CSS](https://tailwindcss.com/): CSS framework for styling
- [Vue.js](https://vuejs.org/): JavaScript framework for building user interfaces
- [NuxtJS](https://nuxtjs.org/): Vue.js framework for server-side rendering

### Folder structure

```bash
portal-jabar-frontend/
├── assets
├── components
├── layouts
├── pages
└── static
```

#### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

#### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

#### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


#### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

#### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

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

Install the dependencies

```bash
npm install
```

## Running locally

Compiles and hot-reloads for development

```bash
npm run dev
```
