import { Mark, Color } from "./enums";
import { Desk } from "./types";

export function createDesk(): Desk {
    let poker: Desk = [];
    const marks = Object.values(Mark);
    const colors = Object.values(Color);
    for (const m of marks) {
        for (const c of colors) {
            poker.push({
                color:c,
                mark:m
            })
        }
    }
    return poker;
}

export function printDesk(poker: Desk) {
    let str: string = ''
    poker.forEach((item, i) => {
        str += item.mark + item.color;
        str += '\t'
        if ((i + 1) % 6 === 0) {
            str += '\n'
        }
    })
    console.log(str);
}