import React from 'react'
import { ButtonScheme, ButtonSize } from '../../style/theme';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLInputElement>
{
    children: React.ReactNode
    size: ButtonSize;
    scheme: ButtonScheme;
    disabled?: boolean;
    isLoading?: boolean;
}


const Button = ({children, size, scheme, disabled, isLoading, ...rest}: Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} disabled={disabled} isLoading={isLoading} {...rest}>
      {children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
    font-size : ${({theme, size}) => theme.button[size].fontSize};
    padding : ${({theme, size}) => theme.button[size].fontSize};
    color: ${({theme, scheme}) => theme.buttonScheme[scheme].color};
    background-color: ${({theme, scheme}) => theme.buttonScheme[scheme].backgroundColor};
    border: 0;
    border-radius : ${({theme}) => theme.borderRadius.default};
    opacity: ${({disabled}) => (disabled? 0.5 : 1)};
    pointer-events: ${({disabled}) => (disabled ? "none" : "auto")};
    cursor:${({disabled}) => (disabled? 'none' : 'pointer')};
    `;


export default Button
