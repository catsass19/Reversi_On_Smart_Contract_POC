import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';
import networkService from '@/service/network';
import Dev from '@/component/Dev';
import Header from '@/component/Header';
import Funding from '@/component/Funding';
import Game from '@/component/Game';
import deversi from '@/assets/deversi.svg';
import 'react-toastify/dist/ReactToastify.min.css';
import appService from '@/service/app';
import dekusan from '@/assets/dekusan.svg';
import Chat from '@/component/Game/components/Chat';

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: black;
    color: #13BF99;
    justify-content: center;
`;

const ModalBackground = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalEffect = keyframes`
    from {
        opacity: 0;
        margin-top: 20vh;
    }
    to {
        opacity: 1;
        margin-top: 0;
    }
`;

const ModalInner = styled.div`
    padding: 20px;
    border: 1px solid #13BF99;
    animation: ${ModalEffect} 0.5s ease-in;
    background-color: black;
`;

const InstallWallet = styled.div`
    text-align: center;
    padding: 20px;
    margin: 20px 0px;
    font-size: xx-large;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
const Dekusan = styled.img`
    height: 50px;
    margin: 20px;
`;
const Highlight = styled.span`
    color: white;
    margin-right: 20px;
`;

const DekuSanLink = 'https://chrome.google.com/webstore/detail/dekusan/anlicggbddjeebblaidciapponbpegoj';

const Warning = styled.div`
    color: white;
    background-color: #FF4136;
    text-align: center;
    padding: 3px;
`;
const LoadingArea = styled.div`
    justify-content: center;
    display: flex;
`;

const MainArea = styled.div`
    display: flex;
    flex: 1;
`;

@observer
class Home extends React.Component<{}, { dev : boolean }> {

    public state = {
      dev: false,
    };

    public componentDidMount() {
        (window as any).dev = () => {
            this.setState({ dev: !this.state.dev });
        };
    }

    public render() {
        const { contract } = networkService;
        const { dev } = this.state;
        return (
            <Container>
                <ToastContainer />
                {!networkService.loaded && (
                    <LoadingArea>
                        <Logo src={deversi} />
                    </LoadingArea>
                )}
                {networkService.loaded && (
                    <>
                        {dev && <Dev />}
                        {!dev && (
                            <>
                                <Header />
                                <MainArea>
                                    {(contract.autoTurn === '0') && <Funding />}
                                    {(Number(contract.autoTurn) > 0) && <Game />}
                                    {(appService.width > 1200) && <Chat />}
                                </MainArea>
                                {!networkService.hasWallet && (
                                    <InstallWallet
                                        onClick={() => {
                                            window.open(DekuSanLink, '_blank');
                                        }}
                                    >
                                        Please install
                                        <Dekusan src={dekusan} />
                                        <Highlight>DekuSan Wallet</Highlight>
                                        to participant
                                    </InstallWallet>
                                )}
                                {!networkService.wsConnecting && (
                                    <Warning>
                                        WebSocket disconnected. Please refresh your browser.
                                    </Warning>
                                )}
                            </>
                        )}
                    </>
                )}
                {appService.isModalOpen && (
                    <ModalBackground onClick={appService.closeModal}>
                        <ModalInner onClick={(e) => e.stopPropagation() }>
                            {appService.mountedModal}
                        </ModalInner>
                    </ModalBackground>
                )}
            </Container>
        );
    }
}

const AppMain = <Home />;

export default AppMain;
