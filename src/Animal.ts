import { IHuoQuan, IPingheng, IWisdom } from "./interfaces";

export abstract class Animal {
    abstract type: string;
    constructor(
        public name: string,
        public age: number,
    ) {

    }

    sayHello(): void {
        console.log(`我是${this.type},我叫${this.name},今年${this.age}`);
    }

}

export class Lion extends Animal implements IHuoQuan {
    type: string = '狮子';
    singShow() {
        console.log('穿越了单火圈')
    }
    doubleShow() {
        console.log('穿越了双获取')
    }
}
export class Tiger extends Animal implements IHuoQuan {
    type: string = '老虎';
    singShow() {
        console.log('穿越了单火圈')
    }
    doubleShow() {
        console.log('穿越了双获取')
    }
}
export class Dog extends Animal implements IWisdom {
    type: string = '狗';
    suanshuti() {
        console.log('算术题')
    }
    tiaowu() {
        console.log('跳舞')
    }
}
export class Monkey extends Animal implements IPingheng {
    type: string = '猴子';
    dumuqiao() {
        console.log('走独木桥')
    }
    zuogangsi() {
        console.log('走钢丝')
    }
}