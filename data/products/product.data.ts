import { Product } from "@models/products/product.model";

export const sampleProduct: Product = new Product({
    id: 1,
    name: "Sample Product",
    description: "This is a sample product.",
    price: 19.99,
    imageUrl: "https://example.com/sample-product.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: "Sample Category",
    availability: true,
    productCode: "SP-001",
    brand: "Sample Brand",
    viewCount: 100,
    tags: ["sample", "product", "example"]
});

export const macbookPro = new Product({
    id: null, // id is missing in JSON
    name: "MacBook Pro",
    description: "Apple's flagship laptop with M3 chip.",
    price: 2000.00,
    imageUrl: "https://example.com/images/macbookpro.jpg",
    createdAt: new Date("2024-06-01T10:00:00Z"),
    updatedAt: new Date("2024-06-10T12:00:00Z"),
    category: "Laptops",
    availability: true,
    productCode: "Product 18",
    brand: "Apple",
    viewCount: 20239,
    tags: ["Apple", "MacBook"]
});

export const ipodTouchAvailable = new Product({
    id: 87,
    name: "iPod Touch",
    description: "Ergonomic wireless mouse with USB receiver.",
    price: 194.00,
    imageUrl: null,
    createdAt: new Date("2024-05-15T09:30:00Z"),
    updatedAt: null,
    category: "Accessories",
    availability: true,
    productCode: "Product 5",
    brand: "Apple",
    viewCount: 20447,
    tags: []
});

export const ipodTouchOutOfStock = new Product({
    id: 32,
    name: "iPod Touch",
    description: "Ergonomic wireless mouse with USB receiver.",
    price: 194.00,
    imageUrl: null,
    createdAt: new Date("2024-05-15T09:30:00Z"),
    updatedAt: null,
    category: "Accessories",
    availability: false,
    productCode: "Product 5",
    brand: "Apple",
    viewCount: 73995,
    tags: []
});