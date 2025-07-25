export interface IProduct {
    id: number | null;
    name: string;
    description?: string | null;
    price?: number | null;
    imageUrl?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    category?: string | null;
    availability?: boolean;
    productCode?: string | null;
    brand?: string | null;
    viewCount?: number;
    tags?: string[];
}

// TODO: Refractor product data so that you can call products.outOfStockProduct.<DETAILS>
// Similar to how accounts.qa.json is stored

export class Product implements IProduct {
    id: number | null;
    name: string;
    description: string | null;
    price: number | null;
    imageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    category: string | null;
    availability: boolean;
    productCode: string | null;
    brand: string | null;
    viewCount: number;
    tags: string[];

    constructor(data: IProduct) {
        this.id = data.id ?? null; // Default to null if not specified
        this.name = data.name;
        this.description = data.description ?? null;
        this.price = data.price ?? null;
        this.imageUrl = data.imageUrl ?? null;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
        this.category = data.category ?? null;
        this.availability = data.availability ?? true; // Default to true if not specified
        this.productCode = data.productCode ?? null;
        this.brand = data.brand ?? null;
        this.viewCount = data.viewCount ?? 0; // Default to 0 if not specified
        this.tags = data.tags ?? [];
    }
}

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