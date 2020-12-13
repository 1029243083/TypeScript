
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