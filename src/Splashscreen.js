import React from 'react';
import styled from 'styled-components';
import { Container } from './StyledComponents';
import { LoginForm } from './Auth/LoginForm';

const Fullscreen = styled.div`
width: 100%;
height: 100%;
background: #673AB7;
`;

const CenteredContainer = styled(Container)`
display: flex;
height: 100%;
width: 60%;
align-items: center;
`;

const SplashscreenContainer = styled.div`
display: flex;
width: 100%;
height: 50%;
`;

const FlexItem = styled.div`
flex-grow: 3;
`;

const Title = styled.p`
font-size: 40px;
`;

export const Splashscreen = () => {

    return (
        <Fullscreen>
            <CenteredContainer>
                <SplashscreenContainer>
                    <FlexItem>
                        <Title>XXXX</Title>
                    </FlexItem>
                    <LoginForm />
                </SplashscreenContainer>
            </CenteredContainer>
        </Fullscreen>
    );
};