
export interface OrderProduct {
    product_id: number;
    quantity: number;
}

export interface BaseOrder {
    products: OrderProduct[];
    user_id: number;
    status: string;
}

export interface order extends BaseOrder {
    id?: number;
}