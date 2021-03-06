import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Board from '@/component/ReversiBoard';
import networkService from '@/service/network';
import ControlHeader from './components/ControlHeader';
import Proposals from './components/Proposals';
import GameOver from './components/GameOver';
import GameInfo from './components/GameInfo';

const Container = styled.div`
    display: flex;
    flex: 1;
    padding: 0px 10px;
    min-height: 0px;
`;
const BoardArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
`;

const ControlArea = styled.div`
    /* border: 1px solid red; */
    flex: 1;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
`;

@observer
export default class Game extends React.Component {

    public render() {
        const { contract } = networkService;
        return (
            <Container>
                <BoardArea>
                    <div>
                        <Board size={contract.currentSize} />
                    </div>
                    <GameInfo />
                </BoardArea>
                <ControlArea>
                    <ControlHeader />
                    {!contract.gameResolvedAuto && (<Proposals />)}
                    {contract.gameResolvedAuto && (<GameOver />)}
                </ControlArea>
            </Container>
        );
    }
}
