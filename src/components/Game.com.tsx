import React from "react";
import { chessType, GameState, nextChess } from "../types/enum";
import { BoardCom } from "./BoardCom";
import { TitleCom } from "./TitleCom";
interface Istate {
    chesses: chessType[]
    gameState: GameState
    nextChess: chessType.red | chessType.blak
}

export class GameCom extends React.Component<{}, Istate>{

    state: Istate = {
        chesses: [],
        gameState: GameState.gameing,
        nextChess: chessType.blak
    }

    init() {
        const newChessed: chessType[] = [];
        for (let i = 0; i < 9; i++) {
            newChessed.push(chessType.none);
        }
        this.setState({
            chesses: newChessed,
            gameState: GameState.gameing,
            nextChess:chessType.blak
        })
    }

    componentDidMount() {
        this.init();
    }

    handlClick(i: number) {
        const chess: chessType[] = [...this.state.chesses];
        chess[i] = this.state.nextChess;
        this.setState(prevState => ({
            chesses: chess,
            nextChess: prevState.nextChess === chessType.red ? chessType.blak : chessType.red,
            gameState: this.getState(chess, i)
        }))
    }

    getState(chesses: chessType[], index: number): GameState {
        const horMin = Math.floor(index / 3) * 3;
        const verMin = index % 3;
        if (chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2]
            ||
            chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6]
            ||
            chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== chessType.none
            ||
            chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== chessType.none
        ) {
            if (chesses[index] === chessType.red) {
                return GameState.redWin
            } else if (chesses[index] === chessType.blak) {
                return GameState.blakWin
            }
        }
        if (!chesses.includes(chessType.none)) {
            return GameState.equal;
        }
        return GameState.gameing

    }

    render() {
        return (
            <div className='game'>
                <TitleCom status={this.state.gameState} nextChess={this.state.nextChess} />
                {/* //当前的游戏状态不是游戏中 游戏结束 */}
                <BoardCom
                    chesses={this.state.chesses}
                    isOver={this.state.gameState !== GameState.gameing}
                    onClick={this.handlClick.bind(this)}
                />
                <button onClick={() => {
                   this.init()
                }}>重新开始</button>
            </div>
        )
    }
}