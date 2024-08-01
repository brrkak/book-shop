import { useEffect, useState } from "react"
import { BookDetail, BookReivewItem, BookReivewItemWrite } from "../models/book.model"
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReivew, fetchBookReivew } from "@/api/reivew.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState(false)
    const [reivews, setReivew] = useState<BookReivewItem[]>([]);
    const {isloggedIn} =useAuthStore();
    const {showAlert} = useAlert();
    const {showToast} = useToast();

    const likeToggle = () => {

        if(!isloggedIn){
            showAlert("로그인이 필요합니다.")
            return;
        }

        if(!book) return

        if(book.liked){
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
                showToast("좋아요가 취소되었습니다.")
            })
        }else{
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                })
                showToast("좋아요 성공했습니다.")
            })
        }
    }

    const addToCart = (quantity:number) => {
        if(!book) return

        addCart({
            book_id: book.id,
            quantity: quantity
        }).then(() => {
            setCartAdded(true)
            setTimeout(() => {
                setCartAdded(false)
            }, 3000);
        });
    };
    
    useEffect(() => {
        if(!bookId) return;
        
        fetchBook(bookId).then((book) => {
            setBook(book);
        });

        fetchBookReivew(bookId).then((reivews) => {
            setReivew(reivews);
        })
    },[bookId]);
    
    const addReivew = (data:BookReivewItemWrite) => {
        if(!book) return;

        addBookReivew(book.id.toString(), data).then((res) => {
            // fetchBookReivew(book.id.toString()).then((reivews) => {
            //     setReivew(reivews);
            // })  
            showAlert(res.message);
        })
    }
    return {book, likeToggle,addToCart,cartAdded, reivews, addReivew};
}


