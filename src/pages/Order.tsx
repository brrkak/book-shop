import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Title from '../components/common/Title';
import { CartStyle as OrderStyle} from './Cart';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '../models/order.model';
import FindAdressButton from '../components/order/FindAdressButton';
import { useAlert } from '../hooks/useAlert';
import { order } from '../api/order.api';

interface DeliveryForm extends Delivery {
  addressDetail : string;
}

const Order = () => {
  const {showAlert, showConfirm} = useAlert();
  const navigate = useNavigate()
  const location = useLocation();
  const orderDataFromCart = location.state;
  const {totalQuantity, totalPrice, firstBookTitle} = orderDataFromCart;

  const {register, 
          handleSubmit, 
          formState: {errors}, 
          setValue} = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderData :OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address : `${data.address} ${data.addressDetail}`
      }
    }
    showConfirm("주문을 실행하겠습니까?", () =>{
      order(orderData).then(() => {
        showAlert("주문이 처리되었습니다.");
        navigate("/orderlist")
      });
    });


  }
  return (
    <>
      <Title size='large'>주문서 작성</Title>
      <OrderStyle>
        <div className="content">
          <div className="order-info">
            <Title size='medium' color='text'>
              배송 정보
            </Title> 
            <form className='delivery'>
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText inputType='text' 
                  {...register("address", {required: true})}/>
                </div>
                <FindAdressButton onCompleted={(address)=>{
                  setValue("address",address);
                }
                }/>
              </fieldset>
              {errors.address && <p className='error-text'>
                주소를 입력하세요.</p>}
              <fieldset>  
                <label>상세 주소</label>
                <div className="input">
                  <InputText inputType='text'
                  {...register("addressDetail", {required: true})}/>
                </div>
              </fieldset>
              {errors.addressDetail && <p className='error-text'>
                상세 주소를 입력하세요.</p>}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText inputType='text'
                  {...register("receiver", {required: true})}/>
                </div>
              </fieldset>
              {errors.receiver && <p className='error-text'>
                수령인을 입력하세요.</p>}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText inputType='text'
                  {...register("contact", {required: true})}/>
                </div>
              </fieldset>
              {errors.contact && <p className='error-text'>
                전화번호를 입력하세요.</p>}
            </form>
          </div>  
          <div className="order-info">
            <Title size='medium' color='text'>
              주문 상품
            </Title>  
            <strong>
              {firstBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>  
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity}
          totalPrice={totalPrice}/>
          <Button size='large' scheme='primary' onClick={handleSubmit(handlePay)}>
            결제하기
          </Button>
        </div>
      </OrderStyle>
    </>
  )
}


export default Order
