import { BookReivewItem } from "@/models/book.model";
import {HttpResponse, http} from "msw"
import { fakerKO as faker } from '@faker-js/faker';

const mockReivewData:BookReivewItem[] = Array.from({length:8}).map((_,index) => ({
    id: index,
    username: `${faker.person.lastName()}${faker.person.firstName()}`,
    content: faker.lorem.paragraph(),    
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({min:1, max:5}),
}))

export const reivewById = http.get("http://localhost:9999/api/reivews/:bookId", 
    ()=> {
    return HttpResponse.json(mockReivewData) 
});

export const addReivew = http.post("http://localhost:9999/api/reivews/:bookId", 
    ()=> {
    return HttpResponse.json(
        {
            message: "리뷰가 등록되었습니다"
        }) 
});

export const reviewForMain =  http.get("http://localhost:9999/api/reivews/", () => {
    return HttpResponse.json(mockReivewData, {
        status: 200,    
    })
})