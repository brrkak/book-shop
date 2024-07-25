import styled from 'styled-components'
import Title from './Title'
import InputText from './InputText'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signup } from '../../api/auth.api'
import { useAlert } from '../../hooks/useAlert'

export interface SignupProps {
  email: string;
  username: string;
  password : string;
}


const Signup = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  // const [email , setEmail] = useState("")
  // const [password , setPassword] = useState("")

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   console.log(email,password);
    
  // }
  const {
    register, 
    handleSubmit, 
    formState: {errors},
  } = useForm<SignupProps>()

  const onSubmit = (data: SignupProps) => {
    signup(data).then((res) => {
      // 성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login")
    })
  }

  return (
    <>
    <Title size='large'>회원가입</Title>
    <SignUpStyle>
     <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
         <InputText placeholder='이메일' inputType='email' {...register("email", {
          required : true })}/>
          {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
        </fieldset>
        <fieldset>
         <InputText placeholder='유저닉네임' inputType='text' {...register("username", {
          required : true })}/>
          {errors.username && <p className="error-text">닉네임을 입력해주세요.</p>}
        </fieldset>
        <fieldset>
        <InputText placeholder='비밀번호' inputType='password' {...register("password", {
          required : true })}/>
           {errors.password && <p className="error-text">비밀번호을 입력해주세요.</p>}
        </fieldset>
        <fieldset>
         <Button type="submit" size='medium' scheme='primary'>
            회원가입   
         </Button>
        </fieldset>
        <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
        </div>
     </form>
    </SignUpStyle>
    </>
  )
}

export const SignUpStyle = styled.div`
max-width: ${({theme}) => theme.layout.width.small};
margin : 80px auto;

fieldset {
  border: 0;
  padding : 0 0 8px 0;
  .error-text{
    color: red;
  }
}

input {
width : 100%;
}

button {
  width: 100%;
}

.info {
  text-align :center;
  padding: 16px 0 0 0;
}

`

export default Signup
