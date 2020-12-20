import { chessType } from "../types/enum";
import React from 'react';
import './ChessCom.css'
interface chess {
    type: chessType
    onClick?: () => void
}


export function Chess(prop: chess) {
    let chessClass = null;
    if (prop.type === chessType.red) {
        chessClass = <div className='red chess-item'></div>
    }
    if (prop.type === chessType.blak) {
        chessClass = <div className='blak chess-item'></div>
    }
    return (
        <div className='chess' onClick={() => {
            if(prop.type === chessType.none && prop.onClick){
                prop.onClick();
            }
        }}>
            {chessClass}
        </div>
    )
}