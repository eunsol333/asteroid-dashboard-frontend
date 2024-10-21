import { styled } from "styled-components";
import asteroidIcon from "../assets/asteroidIcon.svg";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AsteriodImage = styled.img`
  height: 15rem;
  width: 15rem;
  object-fit: cover;
`;

const StyledHeading = styled.h1`
  margin: 0;
  font-size: 4rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <AsteriodImage src={asteroidIcon} alt="Astroid Image" />
      <StyledHeading>Asteriod Dashboard</StyledHeading>
    </StyledHeader>
  );
}
