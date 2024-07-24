import {render, screen} from "@testing-library/react"
import { BoookStoreThemeProvider } from "../../context/themeContext"
import Button from "./Button";

describe("Button 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 렌더
        render(
            <BoookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BoookStoreThemeProvider>
        )
        // 확인
        expect(screen.getByText('버튼')).toBeInTheDocument();
    });
    
    it('size props 적용', () => {
        const {container} = render(
         <BoookStoreThemeProvider>
             <Button size="large" scheme="primary">버튼</Button>
         </BoookStoreThemeProvider>
        );
 
        expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem"});
     });

     it('disable props 적용', () => {
        const {container} = render(
            <BoookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BoookStoreThemeProvider>
           );
           
        expect(screen.getByRole("button")).toHaveStyle({ disable: 0.5 });
    });

})