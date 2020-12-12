type Desk = Brand[]; //字定义类型，根据一张牌

type Brand = { //定义一张牌的类型
    mark:number,
    color:Color
}
type Color = '♠' | '♣' | '♦' | '♥'; //限制花色

function createDesk():Desk {
    let poker:Desk = [];
    for(let i = 1; i <= 13; i++){
        poker.push({
            mark:i,
            color:'♠'
        });
        poker.push({
            mark:i,
            color:'♣'
        });
        poker.push({
            mark:i,
            color:'♦'
        });
        poker.push({
            mark:i,
            color:'♦'
        });
    }
    return poker;
}

function printDesk(poker:Desk){ 
    let str:string = ''
    poker.forEach((item,i) => {
        let n = item.mark;
        if(n === 11){
            str += "j" + item.color;
        }else if(n === 12){
            str += 'Q' + item.color;
        }else if(n === 13){
            str += 'K' + item.color;
        }else {
            str += n + item.color;
        }
        str += '\t'
        if((i + 1) % 6 === 0){
            str += '\n'
        }
    })
    console.log(str);
}

printDesk(createDesk());