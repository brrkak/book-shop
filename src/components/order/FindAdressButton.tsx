import styled from "styled-components"
import Button from "../common/Button"
import { useEffect } from "react";

interface Props {
    onCompleted: (address: string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

const FindAdressButton = ({onCompleted}:Props) => {
    // 스크립트 로드

    // 핸들러

    // 입력
    const handleOpen = () => {
        new window.daum.Postcode({
            oncomplete: (data: any) => {
                onCompleted(data.address as string);                    
            }
        }).open();
    }

    useEffect(() => {
        const script = document.createElement("script")
        script.src = SCRIPT_URL;
        // <script src="URL"></script>
        script.async = true;
        document.head.appendChild(script);
        // <head> <script src="URL"></script> </head>
        return () => {
            document.head.removeChild(script);
        }
    },[])
  return (
    <Button type="button" size='medium' scheme='normal' onClick={handleOpen}>
        주소 찾기
    </Button>
  )
}

const FindAdressButtonStyle = styled.div``

export default FindAdressButton
