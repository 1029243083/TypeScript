# 安装TypesScript
`npm i -g typescript`建议全局安装，因为会有一个命令工具 `tsc`
编译ts `tsc 要编译的文件`

默认情况下，ts会做出以下几种假设
1. 假设当前执行环境是dom
2. 如果代码中没有使用模块化语句(import/export),便认为该代码是全局执行
3. 编译的目标代码是ES3

有两种方式可以更改以上的假设
1. 使用tsc命令行的时候，加上参数
2. 使用ts配置文件

# ts配置文件 JSON格式
1. 手动创建一个文件 `tsconfig.json`
2. 使用命令行 `tsc --init`
3. 有了配置文件之后，在命令行中就不能跟文件名了，会自动忽略这个文件名

```json
{
    "compilerOptions":{ //编译选项
        "target":"es3", //配置ts编译的结果是es的哪个版本
        "module":"commonjs | es6", //配置目标使用的模块化标准
        "lib":["es2016","dom"], //当前的环境,可以添加多个环境，默认有dom，但是这里面没有node环境
        "outDir":"./dist", //编译之后的文件放在哪，默认是跟源文件在一起
    },
    "include":["./src"], //要编译那个文件夹的所有文件 默认是全局的所有文件
    "files":["./src/index.ts"], //指定编译某一个文件以及这个文件所依赖的文件
}
```
因为没有node环境，就需要下一个库`@types/node`
@types 是一个官方的类型库，其中包含了很多对js代码的类型描述
 > Jquery:用js写的，没有类型检查
 > 安装@typs/jquery ,为jquery库添加类型描述

 # 简化编译之后运行的过程
 ts-node: 将ts代码在内存中完成编译，同时完成运行，不会生成文件 命令行 ts-node '要编译的文件路径'
 nodemon: 当文件发生变化，重新编译执行 默认监听所有文件 命令行 nodemon -watch src -e ts --exec ts-node '要编译的文件路径'
                                                                   要监听的文件夹 监听的文件后缀 执行的命令


# 基本类型约束
## 如果进行类型约束
 - 可以约束那些值
    1. 变量
    2. 函数参数
    3. 函数返回值
 - 怎么约束
 - 在变量 函数蚕食 函数返回值位置加上```:类型```
 例如```let name:string="szc"```
 - ts为了减少代码的输入，非常智能的自动推导类型例如
 ```js
    function sun(a:number, b:number) {
        return a + b
    } //ts自动返回number类型的值

    let res = sun(1, 3);// 由于函数返回的数字类型，res变量也自动是数字类型

    let name = 'ssss';// 因为直接赋值一个字符串ts自动推导name是string类型
 ```
 - 当ts推导不出类型,在变量下面有3个点表示,类型是any 
 - any表示任意类型，对该类型，ts不进行类型检查

## 源代码核编译结果的差异
编译结果中没有类型约束的代码，js只能执行js代码

# 基本数据类型
 1. number 数字
 2. string 字符串
 3. 数组 数组必须要表面这是一个什么类型的数组
    ```js
    //方式1
    let arr: number[] = [1,2,34,5];
    //方式2
    let arr: Array<number> = [1,2,34,5];
    ```
 4. object 不能约束对象里面每个值的类型
    ```js
    function printValue(obj:object) {
        const res = Object.values(obj);
        res.forecah(e => consloe.log(e));
    }
    printValue({name:'ss',age:12});
    ```
 5. null和undefined 是所有类型的字类型，他们可以赋值个其他类型例如:
    ```js
    let a:number = undefined; //在没有严格约束中这样是可以赋值的，但是不希望这样，又回到了js中的问题
    //可以在配置文件中添加一个配置strictNullChecks:true,可以获得严格的类型检查 null和undefined只能赋值给自己
    ```
# 其他常用类型
 1. 联合类型
    - 可以在多种类型中任选其一
    - 配合类型保护
    - 类型保护：当对某个变量进行类型判断之后，在判断语句中便可确定他的类型，typeof可以触发基本的类型保护
    ```js
    let a:number | undefined; //可以是数字类型，也可以是undefined
    if(typeof a === 'string'){
        //类型包含
        a.substr(); //这里就有字符串的方法提示，在这里已经确定a是字符串类型
    }
    ```
 2. void类型： 通常用于约束函数的返回值，表示该函数没有返回值
    ```js
    function print():void{
        console.log('sss');
    }
    ```
 3. never类型：通常约束函数的返回值，表示该函数永远不会结束
    ```js
    function Error(msg:string):never{
        throw new Error(msg);
    }

    function test():never{
        while(true){
            //死循环
        }
    }
    ```
 4. 字面量约束：非常强类型的约束
    ```js
    let a:'A'; //这个变量只能赋值为一个字符串的A
    let a:2; //这个变量只能赋值为一个数组2
    let arr:[]; //这个变量只能赋值为一个空数组
    let obj:{ //这个变量只能赋值一个对象 对象里面必须有字符串的name和数字的age
        name:string
        age:number
    }    
    ```
 5. 元组类型(Tuple): 一个固定长度的数组，并且数组中的每一项的类型确定
    ```js
    let a:[string,number]; //这个数组的长度只能是2，第一项是字符串类型，第二项是数字类型
    a = ['string',1];
    ```
 6. any类型：any类型可以绕过类型检查，因此，any类型的数据可以赋值给任意类型
    ```js
    let a:any = 'sss';
    let b:number = a; //不报错，但有隐患
    ```
# 类型别名：对已知的类型定义名称
```js
type User = {
    name:string,
    age:number,
    sex:Sex
}
type Sex = '男' | '女';

let u:User = {
    name:'sss',
    age:12,
    sex:'女'
}

function getUser(s:Sex):User[] {
    return []; //返回的是带user用户的数组，s传入的必须是男或女
}
```

# 函数相关的约束 
 1. 函数重载： 在函数实现之前，对函数调用的多种情况进行声明
 ```js
 function test(a:string,b:string):string;
 function test(a:number,b:number):number;
 function test(a:string | number, b: string | number):string | number{ //这样函数的返回值就会明确返回值是什么类型
     if(typeof a === 'string' && typeof b === 'string'){
         return a + b;
     }else if(typeof a === 'number' && typeof b === 'number'){
         return a * b;
     }
     throw new Error('a和b必须是同一类型')
 }
 ```
 2. 可选参数: 在某些参数后面加上问号，表示该参数可以不用传递，可选选参数必须是在末尾
 ```js
 function test(a:number, b:number, c?:number){
     if(c){
         return a + b +c;
     }
     return a + b;
 }
 test(1,2,3); //默认情况下ts是要传递3个参数，但加了可选参数就不用了
 ```

 # 扩展类型-枚举
 > 扩展类型： 类型别名，枚举，接口，类
  - 字面量类型的问题
    1. 在类型约束的地方，会产生重复代码，但是可以使用类型别名来解决
    ```js
    let gender: "男" | "女";
    gender = '男';

    //type Gender = "男" | "女";

    function screachUser(g:"男" | "女"){ //重复的类型 可使用类型别名

    }
    ```
 - 逻辑含义和真实的值产生了混淆，会导致当修改真实值的时候，产生大量的修改
    ```js
    type Gender = "男" | "女"; //当这里的值需要改的时候，下面的值也需要跟着修改，但逻辑含义没有变化都是表示男 | 女
    let gender:Gender;
    gender = '女';
    gender = '男'
    ```
# 枚举
   - 如何定义一个枚举
   ```js
   enum 枚举名{ //他把真实的值和逻辑名称分离了
       枚举字段 = 值1,
       枚举字段 = 值2,
       ...
   }

   enum Gender { //当我要改值的时候，只有改这里就够了
       male = '男',
       female = '女'
   }
   let gender: Gender;
   gender = Gender.male;
   gender = Gender.female;
   //这里就不能直接赋值'男' | '女' 要使用逻辑名称
   ```
 - 枚举会出现在编译结果中，编译结果表现为一个对象
 - 枚举的规则
    - 枚举的字段值可以是字符串或数字
    - 数字枚举的值会自动自增
    ```js
    enum Level{ //当第一个名称有值，会根据第一个的值自动自增下去，
                // 当第一个名称没有值，默认为0，会根据0自增下去
        level1:1,
        level2,
        level3
    }
    let l:Level;
    l = Level.level1;
    l = Level.level2; //赋值为2
    ```
    - 被数字枚举约束的变量，可以直接赋值为数字
    ```js
    enum Level{
        level1,
        level2,
        level3
    }
    let l:Level;
    l = 1; //可以直接赋值数字，但是不要这样写
    ```
    - 数字枚举的编译结果 和字符串的编译枚举有差异，具体文字不好描述，编译文件直接看
    - 最佳实践
        - 尽量不要在一个枚举中即出现数字字段，又出现字符串字段
        - 使用枚举是，尽量使用枚举字段的名称，而不使用真实的值
        ```js
        enum Level{
            level1,
            level2
        }

        function search(l:Level){

        }
        search(Level.level1)
        ```
# 枚举改造扑克牌练习在src目录下
# 扩展只是；位枚举（枚举的位运算）
 - 只针对数字枚举
 位运算：两个数字换算成二进制后进行运算
```js
enum Permission { //换算成二进制有1的地方代表有权限
    Read = 1,  // =>  0001
    Wirte = 2, // =>  0010
    Create = 4, // => 0100
    Delete = 8, // => 1000
}

// 1. 如何组合权限
// 使用或运算 | 有一个是真则为真，全假为假
// 0001
// 0010
// 0011
let p:Permission = Permission.Read | Permission.Wirte;

// 2. 如何判断是否拥有某个权限
//使用且运算 & 全真才为真
// 0011
// 0010
// 0010
function haspPermission(target:Permission,p:Permission) {
    return (target & p) === target;
    // 0010 === 0010
}
// console.log(haspPermission(Permission.Wirte,p));

// 3. 如何删除权限
//使用 异或运算^ 两个位置相同取0 不同曲1
// 0010
// 0010
// 0001
 p = p ^ Permission.Wirte;
 console.log(haspPermission(Permission.Wirte,p));
```