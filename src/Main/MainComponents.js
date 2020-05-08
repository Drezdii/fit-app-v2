import styled from 'styled-components';
import { Container } from '../StyledComponents';
import { Link } from 'react-router-dom';

export const Bar = styled.div`
width: 100%;
height: 40px;
background: rgb(62, 74, 101);
`;

export const Username = styled.div`
margin: 0;
padding: 0;
color: white;
font-size: 1.3em;
`;

export const FlexContainer = styled(Container)`
height: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const TitleLink = styled(Link)`
text-decoration: none;
font-size: 1.3em;
color: white;
`;

export const BestLifts = styled.div`
color: white;
font-size: 1.3em;
margin-right: 30px;
`;

export const RightPanel = styled.div`
display: flex;
flex-basis: 30%;
justify-content: flex-end;
`;