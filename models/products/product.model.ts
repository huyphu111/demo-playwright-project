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

export interface ICart {
    products: IProductCheckout[];
    subTotal: number;
    ecoTax: number;
    vat: number;
    total: number;
}

export class Cart implements ICart {
    products: IProductCheckout[];
    subTotal: number;
    ecoTax: number;
    vat: number;
    total: number;

    constructor(data: ICart) {
        this.products = data.products;
        this.subTotal = data.subTotal;
        this.ecoTax = data.ecoTax;
        this.vat = data.vat;
        this.total = data.total;
    }
}

export interface IProductCheckout {
    name: string;
    productCode: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

export class ProductCheckout implements IProductCheckout {
    name: string;
    productCode: string;
    quantity: number;
    price: number;
    totalPrice: number;

    constructor(data: IProductCheckout) {
        this.name = data.name;
        this.productCode = data.productCode;
        this.quantity = data.quantity;
        this.price = data.price;
        this.totalPrice = data.totalPrice;
    }
}

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