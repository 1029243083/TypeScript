import { Mark, Color } from "./enums";

export type Desk = Brand[]; //字定义类型，根据一张牌



export type Brand = { //定义一张牌的类型
    mark: Mark,
    color: Color
}
