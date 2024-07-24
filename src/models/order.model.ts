
export interface Order{
    id: number;
    created_at: string;
    address: string;
    receiver: string;
    contact: string;
    book_title: string;
    total_quantity: number;
    total_price: number;
}