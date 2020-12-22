abstract class Chess {
    x: number = 0
    y: number = 0
    abstract name: string;
    move(targetX: number, targetY: number) { //流程完全一致
        console.log('是否超出边界'),
            console.log('目标位置是否有己方棋子')
        if (this.rult(targetX, targetY)) { // 这个需要不同的棋子，有不同的规则，需要不同的棋子，自己实现 所以做成抽象方法
            return true
        }
    };
    protected abstract rult(targetX: number, targetY: number): boolean;
}

class Hores extends Chess {
    name: string
    constructor() {
        super();
        this.name = '马'
    }
    protected rult() {
        console.log('实现一些规则');
        return true;
    }

}

class Cannon extends Chess {
    get name(): string {
        return '兵'
    }
    protected rult() {
        console.log('实现一些规则');
        return true;
    }

}

class Soldier extends Chess {
    name: string = '炮';
    protected rult() {
        console.log('实现一些规则');
        return true;
    }
}