import { Mark, Color } from "./enums";
import { Card, Desk, King } from "./types";

export function createDesk(): Desk {
    let poker: Desk = [];
    const marks = Object.values(Mark);
    const colors = Object.values(Color);
    for (const m of marks) {
        for (const c of colors) {
            poker.push({
                color:c,
                mark:m,
                getString(){
                    return this.color + this.mark
                }
            } as Card)
        }
    }
    let king:King = {
        type:'big',
        getString(){
            return "JO"
        }
    }   
    poker.push(king);
    king = {
        type:'samll',
        getString(){
            return "jo"
        }
    }
    poker.push(king)
    return poker;
}

export function printDesk(poker: Desk) {
    let str: string = ''
    poker.forEach((item, i) => {
        str += item.getString();
        str += '\t'
        if ((i + 1) % 6 === 0) {
            str += '\n'
        }
    })
    console.log(str);
}