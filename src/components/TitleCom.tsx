import { GameState, chessType } from "../types/enum";

interface Iprop {
    status: GameState,
    nextChess: chessType.red | chessType.blak
}
export function TitleCom(prop: Iprop) {
    let title: JSX.Element;
    if (prop.status === GameState.gameing) {
        if (prop.nextChess === chessType.red) {
            title = <div>红方</div>
        } else {
            title = <div>黑方</div>
        }
    } else {
        if (prop.status === GameState.redWin) {
            title = <div>红方胜利</div>
        } else if (prop.status === GameState.blakWin) {
            title = <div>黑方胜利</div>
        } else {
            title = <div>平局</div>
        }
    }
    return title;
}