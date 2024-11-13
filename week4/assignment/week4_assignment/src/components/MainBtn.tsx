import styled from '@emotion/styled';

//인터페이스로 넘겨야할 프로퍼티 설정. ? <<이거는 꼭 선언 안해도 되는 선택값
interface MainBtnProps {
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    active? : boolean;
}

const MainBtn = styled.button<MainBtnProps>`
    width: 40rem;
    padding: 1rem;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    background-color: ${({ color, theme, active = true }) => 
        active ? (color || '#007BFF') : theme.colors.gray};
    border: none;
    border-radius: 0.5rem;
    cursor: ${({ active = true }) => (active ? 'pointer' : 'not-allowed')};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ hoverColor, theme, active = true }) => 
            active ? (hoverColor || '#0056b3') : theme.colors.gray};
    }

    &:active {
        background-color: ${({ activeColor, theme, active = true }) => 
            active ? (activeColor || '#004080') : theme.colors.gray};
    }
`;

export default MainBtn;
