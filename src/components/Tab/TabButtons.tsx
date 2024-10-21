import { styled } from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #000000;
  color: #ebe7ef;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 3rem;

  &:not(:disabled):hover {
    background-color: #a9a9a9;
    color: #ebe7ef;
  }

  &:disabled {
    background-color: #black;
    color: #8c8c8c;
    cursor: not-allowed;
  }
`;

interface TabButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function TabButton({
  children,
  onClick,
  style,
  disabled = false,
}: TabButtonProps) {
  return (
    <StyledButton onClick={onClick} style={style} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
