import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Bar, FlexContainer, TitleLink, RightPanel, BestLifts, Username } from './MainComponents';

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