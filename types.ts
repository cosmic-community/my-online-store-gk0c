export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicImage;
  };
}

export type StockStatus = 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pre-Order';

export interface Variant {
  name?: string;
  value?: string;
  price?: number;
  sku?: string;
  inventory?: number;
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    sale_price?: number;
    sku?: string;
    inventory_count?: number;
    stock_status?: string;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    category?: Category;
    variants?: Variant[] | string;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review_title?: string;
    review_content?: string;
    verified_purchase?: boolean;
    product?: Product;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}