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

# ts总的模块化
 - Ts中，导入导出模块，统一使用ES6的模块化标准
  - 在导出时使用声明导出，可以有提示shuom
  - 不要在路劲后面加上后缀名会报错
  ```js
  export let name = 'szc';
  import {name} from './xxx'
  ```
# 模块化的一些配置
------------------------------------------------------
|模块名称              | 含义                         |
|----------------------------------------------------|
|module                |设置编译结果使用的模块标准      |
|moduleResolution      |设置解析模块的模式             |
|noImplicitUseStrict   |编译结果中不包含"use strict"   |
|removeComments        |编译结果去除注释               |
|noEmitOnError         |错误时不生成编译结果            |
|esModuleInterop       |启用es模块化交换非es模块导出    |
-------------------------------------------------------

# 编译结果中的模块化
 - 可配置 module配置
 - 如果是编译结果的模块化标准是ES6：没有区别
 - 如果编译结果的模块化标准是commonjs：导出的声明会变成exports的属性
    默认的导出会变成exports的default属性
# 如果在TS中书写commonjs模块化代码
 - 导出：export：xxx
 - 导入：import xxx = require('xxxx')

# 模块解析
 - 模块解析：应该从什么位置寻找模块
 - TS中，有两种模块解析策略
  - classic:经典
  - node: node解析策略（唯一的变化，是将js替换为ts）

# 接口和类型兼容
 - 接口：inteface
 > 扩展类型：类型别名，枚举，接口，类
 - typescript接口：用于约束类，对象，函数的契约(标准)
 - 契约(标准) 的形式：
    1. api文档，弱标准
    2. 代码约束，强标准

 1. 如何约束对象
    ```js
    interface 名字{
        字段名：类型
    }
    interface User{ //根类型别名差不多，接口主要在类的约束
        name:string,
        age:number
    }
    ```
 2. 如何约束函数
    ```js
    interface User{ //约束对象中的函数
        name:string,
        sayHello:()=>viod,
        sayHello():viod
    }

    interface User{ //约束单个函数
        (n:number): boolean
    }

    function sun(numbers:number[],callback:User){ //约束callback函数，参数为数字类型，返回值为布尔类型

    }
    sun([1,2,3,4],(n) => n%2 == 1)
    ```
 3. 接口的继承
    ```js
    interface T1{
        A:string
    }
    interface T2 extends T1{
        b:number
    }
    let C:T2 = { //必须有a,b属性
        a:'szc',
        b:11
    }

    继承多个
    interface T3 extends T1,T2{
        c:number
    }
    ```
    类型别名也能属性继承的效果
    ```js
    type T1 = {
        a:string
    }
    type T2 = {
        b:number
    }
    type Ts = {
        c:boolean
    } & T1 & T2
    ```
     - 需要通过```&```,他叫做交叉类型
 - 他们的区别
    - 子接口不能覆盖接口的成员 "接口"
    - 交叉类型会把相同的成员的类型进行交叉 

 - **readonly**
    只读修饰符，修饰的目标是只读
    只读修饰符不在编译结果中
    ```js
    //修饰某个属性
    interface User{
        readonly id:string,  //加上修饰符，这个属性不能变化，只能读取
        age:number,
    }
    //修饰一个数组
    let arr : readonly number[] = [1,23,4,5]; //约束的是这个数字不是这个变量，变量从const就不保证不被改变，这个用修饰符修饰的数组，不能使用数组的方法，不能改变数组里的值

    //修饰对象里的数组
    interface User {
       readonly arr: readonly number[]//两个修饰符 表示这个数组不能被更改，这个数组里面页不能被更改
    }
    ```

# 类型兼容性
B -> A ,如果能完成赋值，则A和B类型兼容
鸭子辩型法(子结构辩型法)
 - 对象类型：鸭子辩型法
```js
interface Duck{
    sound:"嘎嘎嘎"
    swin(): viod
}
let person = {
    name?:'sss', //可选属性
    sound: '嘎嘎嘎' as '嘎嘎嘎', //类型断言
    swin(){
        consloe.log('ss')
    }
}

let u:Duck = person; //只要有sound 和 wsin方法就行

//直接赋值字面量对象，只能写规定好的属性，你已经定义他是一只鸭子，就不能有其他的属性，但用上面的方式赋值可以，因为这个对象，可能来自其他地方，ts也无法保证对象里的属性
let u:Duck = {
    name:'sss', //这里是报错的
    sound:'嘎嘎嘎',
    swin(){
        console.log('ss')
    }
}
```
 - 函数类型
  一切无比自然
  **参数** 传递给目标函数的参数可以少，但不可以多
  **返回值** 要求返回必须返回，不要求返回，你随意

# TS中的类
**属性**
使用属性列表来描述类中的属性
```js
Class User {
    name:string, //属性列表
    age:number,
    gender:"男" | "女" = '男' //默认属性
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
}
```
属性的初始化检查使用配置 ```strictPropertyInitialization:true```
属性初始化的位置
 - 构造函数中
 - 属性的默认值

**可选属性**
```js
Class User {
    name:string //属性列表
    age:number
    gender:"男" | "女" = '男' //默认属性
    pid?:string //可选属性 就是string类型和undefined类型  这个不在属性初始化中
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
}
```
**不可变的属性**
```js
Class User {
    readonly id:number //只读的属性
    name:string //属性列表
    age:number
    gender:"男" | "女" = '男' //默认属性
    pid?:string //可选属性 就是string类型和undefined类型  这个不在属性初始化中
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
}
```
**私有化的属性**
public： 公共的属性，里外都能访问修改 默认的属性就是这个
private：私有的，只能在类中使用，这个修饰符还可以添加给方法，让方法私有
```js
Class User {
    readonly id:number //只读的属性
    name:string //属性列表
    age:number
    gender:"男" | "女" = '男' //默认属性
    pid?:string //可选属性 就是string类型和undefined类型  这个不在属性初始化中
    private nowIndex:number = 1 //表示私有的属性这能在这个类中使用
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
}
```
**属性简写**
如果某个属性，通过构造函数的参数传递，并且不对这个属性进行处理并直接赋值，就可以用简写
```js
Class User {
    readonly id:number //只读的属性
    name:string //属性列表
    gender:"男" | "女" = '男' //默认属性
    pid?:string //可选属性 就是string类型和undefined类型  这个不在属性初始化中
    private nowIndex:number = 1 //表示私有的属性这能在这个类中使用
    constructor(name:string, public age:number){ //在参数前面加上public
        this.name = name;
    }
}
```
**ts的访问器**
作用：用于控制属性的读取和设置
```js
Class User {
    readonly id:number //只读的属性
    name:string //属性列表
    gender:"男" | "女" = '男' //默认属性
    pid?:string //可选属性 就是string类型和undefined类型  这个不在属性初始化中
    private nowIndex:number = 1 //表示私有的属性这能在这个类中使用
    constructor(name:string, public age:number){ //在参数前面加上public
        this.name = name;
    },
    set age(){
        //经过函数处理
    },
    get age(){
        //经过函数处理
    }
}
```
# 泛型
 - 有时，书写某个函数时，会丢失一些信息（多个位置的类型应该保持一致或有关联的信息）
 - 泛型：是指附属于函数，类，接口，类型别名之上的类型
 - 泛型相当于一类型变量，在定义时，无法预先知道具体的类型，可以用该变量来代替，只有在调用时才能确定他的类型
 - 如果无法完成推导，并且又没有传递具体的类型，默认为空对象
 - 泛型可以使用默认值

# 在函数中使用泛型
在函数名之后写上```<泛型名称>```
```js
//T代表泛型
function test<T>(arr:T[],n:number) {
    let newArr:T[] = [];
    if(n >= arr.length){
        return arr;
    }else{
        for(let i = 0; i < arr.length; i++){
            newArr.push(arr[i]);
        }
    }
}
const res = test<number>([1,2,3,4,5],2);
```
# 如何在类型别名，接口，类中使用泛型
直接在名称后写上```<泛型名称>```
```js
type callback<T> = (n:<T>,i:number) => boolean
function filter<T>(arr:<T>,callback:callback<T>) {
    arr.forEach((n,i) => {
        callback(n,i);
    })
}
```
# 泛型约束
泛型约束用于泛型的取值

# 多泛型
 - 依赖多个泛型
```js
function mixinArray<T,K>(arr1:T[],arr2:T[]):(T|K)[] {

}
```

# 抽象类
## 为什么需要抽象类 下面是象棋的例子
```js
class Chess { //棋子类 抽象概念

}

class 炮{ //继承棋子类

}

 class 马{ // 继承棋子类

 }

```
但是有一个隐患，可能在后面的代码中```new chess```创建一个抽象类的棋子，但是这只是一个抽象类，所以可以在抽象类前面加上```abstract```,这样就不能```new Chess```,就不能创建抽象类的实例

## 抽象成员
父类中，可以知道有些成员必须存在，但是不知道值是什么，因此需要有一种强约束，然继承该类的子类，必须要有这个属性或方法

**抽象类中** ，可以有抽象成员，这些抽象成员都是在子类中实现
```js
class Chess { //棋子类 抽象概念
    abstract readonly name:string; //抽象成员，每个子类必须要有这个属性，但是在父类中不知道值是什么
}

class 炮{ //继承棋子类
    name:string = '炮'
}

 class 马{ // 继承棋子类
   readonly name:string;
    constructor(){
        supr();
        this.name:string = '马'
    }
 }

class 兵{ // 继承棋子类
    get name(){
        return '兵'
    }
 }
 //三中方式都行
```

## 设计模式 --模板模式
 - 设计模式：面对一些常用的功能场景，有一些固定的，经过多年实践成熟的方法，这些方法称为设计模式，
 - 模板方法：有些方法，所有的子类实现流程完成一致，只是流程中的某个步骤的具体实现不一致，可以将该方法提取到父类，在父类中完成整个流程的实现，遇到实现不一致的方法时，将该方法做成抽象放法

 # 静态成员
 ## 什么时静态成员
  - 静态成员是指，附着在类上的成员(属于某个构造函数的成员)
  使用static修饰的成员，是静态成员
  实例成员：对象成员，属于某个类的对象
  静态成员：非实例成员，属于某个类
##  静态方法中的this
 - 实例方法中的this指向**当前对象**
 - 静态方法中的this指向**当前类**

## 设计模式--单例模式
 - 单例模式：某些类，在系统中最多只能有一个，为了避免开发者造成随意创建多个类对象的错误，可以使用单例模式进行强约束