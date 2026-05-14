# My Online Store

![App Preview](https://imgix.cosmicjs.com/e77718b0-4f86-11f1-8004-49554e815733-autopilot-photo-1578500494198-246f612d3b3d-1778757625266.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront built with Next.js 16 and Cosmic CMS. Browse products, explore categories, and read customer reviews in a beautifully designed shopping experience.

## Features

- 🛍️ Product catalog with detailed product pages
- 🏷️ Category browsing and filtering
- ⭐ Customer reviews with star ratings
- 🎨 Modern, responsive design
- 💰 Sale prices and stock status
- 🖼️ Image galleries with imgix optimization
- 📱 Mobile-first responsive layout

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a05af99b4bc78a77bbdb459&clone_repository=6a05b09fb4bc78a77bbdb497)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites

- Bun (or Node.js 18+)
- Cosmic account with bucket configured

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all products with category info
const { objects } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch reviews for a specific product
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types: `products`, `categories`, and `reviews`. All data is fetched server-side via the Cosmic SDK.

## Deployment Options

Deploy to Vercel or Netlify. Set environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->