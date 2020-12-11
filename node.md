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