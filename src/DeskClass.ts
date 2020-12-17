import { Mark, Color } from './enums';
import { Card, King } from './types';
interface player {
    player1: Card[]
    player2: Card[]
    player3: Card[]
    deskTop: Card[]
}
export class Desk {
    private careds: Card[] = [];

    constructor() {
        this.init();
    }

    private init() {
        const marks = Object.values(Mark);
        const colors = Object.values(Color);
        for (const m of marks) {
            for (const c of colors) {
                this.careds.push({
                    color: c,
                    mark: m,
                    getString() {
                        return this.color + this.mark
                    }
                } as Card)
            }
        }
        let king: King = {
            type: 'big',
            getString() {
                return "JO"
            }
        }
        this.careds.push(king);
        king = {
            type: 'samll',
            getString() {
                return "jo"
            }
        }
        this.careds.push(king)
    }

    print() {
        let str: string = ''
        this.careds.forEach((item, i) => {
            str += item.getString();
            str += '\t'
            if ((i + 1) % 6 === 0) {
                str += '\n'
            }
        })
        return str;
    }

    shuffle() {
        for (let i = 0; i < this.careds.length; i++) {
            const temp = this.careds[i];
            const index = this.random(0, this.careds.length);
            this.careds[i] = this.careds[index];
            this.careds[index] = temp;
        }
    }


    private random(min: number, max: number) {
        let n = max - min;
        return Math.floor(Math.random() * n);
    }

    pubilsh(): player {
        let player1 = this.shift(17);
        let player2 = this.shift(17);
        let player3 = this.shift(17);
        let deskTop = this.shift(3);
        return {
            player1,
            player2,
            player3,
            deskTop
        }
    }

    shift(n: number) {
        let desk: Card[] = [];
        for (let i = 0; i < n; i++) {
            desk.push(this.careds.shift() as Card)
        }
        return desk;
    }

} 