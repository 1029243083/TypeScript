import { Mark, Color } from "./enums";

export type Desk = Card[]; //字定义类型，根据一张牌

export interface King extends Card{
    type: "big" | "samll"
}

export interface Brand extends Card { //定义一张牌的类型
    mark: Mark,
    color: Color
}

export interface Card {
    getString(): string
}
