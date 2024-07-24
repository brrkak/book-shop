import {render, screen} from "@testing-library/react"
import Title from "./Title"
import { BoookStoreThemeProvider } from "../../context/themeContext"

describe("Title 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 렌더
        render(
            <BoookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BoookStoreThemeProvider>
        )
        // 확인
        expect(screen.getByText('제목')).toBeInTheDocument();
    });
    
    it('size props 적용', () => {
       const {container} = render(
        <BoookStoreThemeProvider>
            <Title size="large">제목</Title>
        </BoookStoreThemeProvider>
       );

       expect(container?.firstChild).toHaveStyle({ fontSize: "2rem"});
    });

    it('color props 적용', () => {
        const {container} = render(
            <BoookStoreThemeProvider>
                <Title size="large" color="primary">제목</Title>
            </BoookStoreThemeProvider>
           );
        expect(container?.firstChild).toHaveStyle({ color: "brown"});
    })
});