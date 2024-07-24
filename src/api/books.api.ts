import { Book } from "../models/book.model";
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