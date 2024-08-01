export interface Book{
    id: number;
    title: string;
    img: number;
    category_id: number;
    form: string;   
    isbn: string;
    summary: string;
    detail: string;
    author: string;
    pages: number;
    contents: string;
    price: number;
    likes: number;
    pubDate: string;
}

export interface BookDetail extends Book{
    categoryName : string;
    liked: boolean;
}

export interface BookReivewItem {
    id: number;
    username: string;
    content: string;
    createdAt: string;
    score: number;
}

export type BookReivewItemWrite = Pick<BookReivewItem, "content" | "score">;