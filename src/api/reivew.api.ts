import { BookReivewItem, BookReivewItemWrite } from "@/models/book.model";
import { requestHandler } from "./http";

export const fetchBookReivew = async(bookId: string) => {
    return await requestHandler<BookReivewItem[]>("get", `/reivews/${bookId}`);
}

interface addBookReivewResponse {
    message: string;
}

export const addBookReivew = async(bookId: string, data:BookReivewItemWrite) => {
    return await requestHandler<addBookReivewResponse>("post", `/reivews/${bookId}`)
}