import {BookReivewItemWrite, BookReivewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReivewItem from './BookReivewItem';
import BookReivewAdd from './BookReviewAdd';

interface Props {
    reviews: IBookReviewItem[];
    onAdd: (data: BookReivewItemWrite) => void;
}

const BookReivew = ({reviews, onAdd}:Props) => {
  return (
    <BookReivewStyle>
        <BookReivewAdd onAdd={onAdd}/>
        {reviews.map((review) => (
            <BookReivewItem review={review}/>
        ))}
    </BookReivewStyle>
  )
}

const BookReivewStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export default BookReivew