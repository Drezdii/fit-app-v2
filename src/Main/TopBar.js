import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../StyledComponents';
import { Link } from 'react-router-dom';

const Bar = styled.div`
width: 100%;
height: 40px;
background: rgb(62, 74, 101);
`;

const Username = styled.div`
margin: 0;
padding: 0;
color: white;
font-size: 1.3em;
`;

const FlexContainer = styled(Container)`
height: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const TitleLink = styled(Link)`
text-decoration: none;
font-size: 1.3em;
color: white;
`;

const BestLifts = styled.div`
color: white;
font-size: 1.3em;
margin-right: 30px;
`;

const RightPanel = styled.div`
display: flex;
flex-basis: 30%;
justify-content: flex-end;
`;

export const TopBar = () => {
    const login = useSelector(state => state.user.login);

    return (
        <Bar>
            <FlexContainer>
                <TitleLink to='/'>Fit APP</TitleLink>
                <RightPanel>
                    <BestLifts>
                        S: 0
                        D: 0
                        B: 0
                    </BestLifts>
                    <Username>{login}</Username>
                </RightPanel>
            </FlexContainer>
        </Bar>
    );
};