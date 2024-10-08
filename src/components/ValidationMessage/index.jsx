import styled from "styled-components";

const Error = styled.p`
  color: var(--color-dark-secondary);
`;

export default function ValidationMessage({ errorMessage }) {
  return <Error>{errorMessage}</Error>;
}
