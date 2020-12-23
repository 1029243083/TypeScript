import { Animal, Dog, Lion, Monkey, Tiger } from "./Animal";
import { IHuoQuan, IPingheng } from "./interfaces";

const animals: Animal[] = [
    new Lion('王富贵', 10),
    new Tiger('蔡徐坤', 10),
    new Monkey('陈建军', 10),
    new Dog('秦宏文', 10)
]
// animals.forEach((a) => {
//     a.sayHello();
// })

/**
 * 
 * @param ani 
 * 手动写类型保护
 * 返回ani 是不是 IHuoQuan接口
 * 把传入的参数 直接断言 你要判读函数的接口，看看ani这个实例有没有 接口里的函数
 * 有的话返回 true 代表 ani in IHuoQuan有
 * 
 * 现在 是否能进行火圈表演跟是哪个动物没有任何关系，只要你有这个能力就能表演
 * 
 * 接口
 * 
 * 能力
 * 
 * 动物
 * 
 * 某个动物可以拥有某个能力，也可以没有，是分开的
 * 
 */
function hasHuoquan(ani: object): ani is IHuoQuan {
    if ((ani as IHuoQuan).singShow && (ani as IHuoQuan).singShow) {
        return true
    }
    return false
}

/**
 * 所有会跳火圈的动物进行火圈表演 不管是什么动物，有能力就来
 */
animals.forEach(a => {
    if (hasHuoquan(a)) {
        a.singShow();
        a.doubleShow();
    }
})

function hasPingheng(ani: object): ani is IPingheng {
    if ((ani as IPingheng).dumuqiao && (ani as IPingheng).zuogangsi) {
        return true
    }
    return false
}

/**
 * 所有会平衡表演的进行平衡表演 不管是什么动物，有能力就来
 */
animals.forEach(a => {
    if (hasPingheng(a)) {
        a.zuogangsi();
        a.dumuqiao();
    }
})
