import { chessType } from "../types/enum";
import { Chess } from "./ChessCom";
import './BoradCom.css';

interface iProp {
    chesses: chessType[]
    isOver: boolean
    onClick?: (i: number) => void
}

export function BoardCom(prop: iProp) {
    let list = prop.chesses.map((type, i) => {
        return <Chess type={type} key={i} onClick={() => {
            if (prop.onClick && !prop.isOver) {
                prop.onClick(i)
            }
        }} />
    })
    return (
        <div className='boardCom'>
            {list}
        </div>
    )
}