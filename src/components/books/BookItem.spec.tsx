import React from 'react'
import BookItem from './BookItem'
import { render } from '@testing-library/react'
import { BoookStoreThemeProvider } from '../../context/themeContext'

const dummyBook = {  
    id: 1,
    title: "콩쥐 팥쥐",
    img: 4,
    category_id: 0,
    form: "ebook",
    isbn: "4",
    summary: "콩팥..",
    detail: "콩심은데 콩나고..",
    author: "김콩팥",
    pages: 100,
    contents: "목차입니다.",
    price: 20000,
    likes: 4,
    pubDate: "2023-12-07"
  }
  
  describe("BookItem", () => {
    it("렌더 여부", () => {
        const {getByText, getByAltText} = render(
            <BoookStoreThemeProvider>
                <BookItem book={dummyBook}/>
            </BoookStoreThemeProvider>
        );

        expect(getByText(dummyBook.title)).toBeInTheDocument();
        expect(getByText(dummyBook.summary)).toBeInTheDocument();
        expect(getByText(dummyBook.author)).toBeInTheDocument();
        expect(getByText('20,000원')).toBeInTheDocument();
        expect(getByText(dummyBook.likes)).toBeInTheDocument();
        expect(getByAltText(dummyBook.title))
        .toHaveAttribute("src",`https://picsum.photos/id/${dummyBook.img}/600/600`);
    })
  })