import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    display: block;
    margin-top: 8px;
    font-size: 12px;
  }
`;
