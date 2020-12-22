// class User {

//     private static users: User[] = []

//     constructor(
//         public loginId: string,
//         public loginPwd: string,
//         public name: string,
//         public age: number
//     ) {
//         User.users.push(this);
//     }

//     sayHello(): void {
//         console.log(`我是${this.name}今年${this.age},我的账号${this.loginId}`);
//     }

//     static login(loginId: string, loginPwd: string): User | undefined {
//         return this.users.find((user) => {
//             return user.loginId === loginId && user.loginPwd === loginPwd
//         })
//     }

// }

// new User('aaa', '111', 'u1', 11);
// new User('aaa', '111', 'u2', 11);
// new User('aaa', '111', 'u3', 11);

// const res = User.login('aaa', '111');
// if (res) {
//     console.log(res.sayHello())

// } else {
//     console.log('账号密码错误')
// }

class Board {
    private constructor() { }
    private static _board: Board

    static createBoard() {
        if (this._board) {
            return this._board;
        } else {
            this._board = new Board();
            return this._board;
        }
    }
}

const b = Board.createBoard();
const b1 = Board.createBoard();
console.log(b === b1)