import {render, screen} from "@testing-library/react"
import { BoookStoreThemeProvider } from "../../context/themeContext"
import InputText from "./InputText";
import React from "react";

describe("InputText 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 렌더
        render(
            <BoookStoreThemeProvider>
                <InputText placeholder="여기에 입력하세요"></InputText>
            </BoookStoreThemeProvider>
        )
        // 확인
        expect(screen.getByPlaceholderText('여기에 입력하세요')).toBeInTheDocument();
    });
    
    it('forwardRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
         <BoookStoreThemeProvider>
             <InputText placeholder="여기에 입력하세요" ref={ref}></InputText>
         </BoookStoreThemeProvider>
        );
 
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
     });

    //  it('disable props 적용', () => {
    //     const {container} = render(
    //         <BoookStoreThemeProvider>
    //             <InputText size="large" scheme="primary">버튼</InputText>
    //         </BoookStoreThemeProvider>
    //        );
           
    //     expect(screen.getByRole("InputText")).toHaveStyle({ disable: 0.5 });
    // });

})