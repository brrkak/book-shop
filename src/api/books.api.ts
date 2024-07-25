import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id? : number;
    recentbooks? : boolean;
    currentPage? : number;
    limit : number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination : Pagination;
}

export const fetchBooks = async(params:FetchBooksParams) => {
    try{
        const response = await httpClient.get<FetchBooksResponse>("/books", {
            params : params
        });
        console.log(response);
        
        return response.data;
    }catch(err){
        return {
            books: [],
            pagination : {
                currentPage : 1,
                totalCount : 0,
            }
        }
        
    }
};

export const fetchBook = async (bookId:string)=>{
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

    return response.data;
}

export const likeBook = async (bookId: number) => {
    const response = await httpClient.post(`/likes/${bookId}`);

    return response.data;
}

export const unlikeBook = async (bookId: number)=>{
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;

}