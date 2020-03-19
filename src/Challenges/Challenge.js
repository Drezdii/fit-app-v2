import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { AddChallengeEntry } from './AddChallengeEntry';
import { addToCurrent } from './ChallengesActions';

const ChallengeWrapper = styled.div`
width: 300px;
margin: auto;
height: 300px;
background: #e4e4e4;
`;

const Title = styled.p`
text-align: center;
font-size: 1.2em;
background: rgb(62, 74, 101);
padding: 10px;
color: white;
`;

const ProgressBar = styled.div`
height: 20px;
border-radius: 2px;
font-size: 1em;
width: 200px;
border: 1px solid black;
position: relative; left: 0px;
`;

const Progress = styled.div`
width: ${props => props.percentage}%;
height: 100%;
background: green;
text-align: center;
color: white;
`;

const Percentage = styled.span`
position: absolute;
left: 50%;
color: black;
`;

export const Challenge = props => {
    const challenge = useSelector(state => state.challenges.byId[props.id]);

    // Days left between finish date and now
    const daysLeft = moment(challenge.finishDate).diff(moment(), 'days');
    // Progress made out of 100%
    const percent = (challenge.current / challenge.target) * 100;

    const dispatch = useDispatch();

    const handleAdd = reps => {
        dispatch(addToCurrent({ amount: reps, challengeid: props.id, userID: props.userID }));
    };

    return (
        <ChallengeWrapper>
            <Title>{challenge.name}</Title>
            <div>
                <p>Days left: {daysLeft}</p>
                <p>Current: {challenge.current} / {challenge.target}</p>
                <p>Daily target: {Math.ceil((challenge.target - challenge.current) / daysLeft)}</p>
                <p>Progress</p>
                <ProgressBar>
                    <Percentage>{percent.toFixed(1)}%</Percentage>
                    <Progress percentage={percent}></Progress>
                </ProgressBar>

                <AddChallengeEntry handleAdd={handleAdd} />
            </div>
        </ChallengeWrapper>
    );
};