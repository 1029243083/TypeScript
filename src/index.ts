import { classDescription, printObj, propDescripton } from "./description";

@classDescription('用户')
class User {
    // @propDescripton('账号')
    loginId: string
    @propDescripton('密码')
    loginPwd: string
}

const u = new User();
u.loginId = 'aaa',
u.loginPwd = '123'
printObj(u)