type Desk = Brand[]; //字定义类型，根据一张牌

enum Color {
    heart = '♥',
    spade = '♠',
    club = '♣',
    diamond = '♦'
}

enum Mark{
    A = "A",
    two='2',
    three = '3',
    four = '4',
    five = '5',
    six = '6',
    seven = '7',
    eight = '8',
    nive = '9',
    ten = '10',
    eleven = 'J',
    twelve = 'Q',
    thirteen = 'K'
}

type Brand = { //定义一张牌的类型
    mark: Mark,
    color: Color
}

function createDesk(): Desk {
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

function printDesk(poker: Desk) {
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

printDesk(createDesk());