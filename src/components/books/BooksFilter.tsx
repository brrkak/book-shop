import React from 'react'
import styled from 'styled-components'
import { useCategory } from '../../hooks/useCategory'
import { useSearchParams } from 'react-router-dom';
import Button from '../common/Button';
import { QUERYSTRING } from '../../constants/querystring';

const BooksFilter = () => {
  const {category} = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if(id === null){
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    }else{
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }
    console.log('Updated Search Params:', newSearchParams.toString());
    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams); 
    if(newSearchParams.get(QUERYSTRING.RECENT_BOOKS)){
      newSearchParams.delete(QUERYSTRING.RECENT_BOOKS)
    }else{
      newSearchParams.set(QUERYSTRING.RECENT_BOOKS,'true')
    }

    setSearchParams(newSearchParams);
  }
  
  return (
    <BooksFilterStyle>
      <div className="category">
        {
          category.map((item) => (
            <Button 
            size='medium' 
            scheme={item.isActive ? 'primary' : 'normal'}
            key={item.id} 
            onClick={() => handleCategory(item.id)}>
              {item.name}
            </Button>
          ))}
      </div>
      <div className="new">
        <Button size='medium' scheme={searchParams.get(QUERYSTRING.RECENT_BOOKS)? "primary" : "normal"}
        onClick={() =>  handleNews()}>
          신간  
        </Button>
      </div>
    </BooksFilterStyle>
  )
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category{
    display: flex;
    gap: 8px;
  }
`


export default BooksFilter