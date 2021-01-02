/**
 * 
 * @param description 
 * 类的描述
 */
export function classDescription(description: string) {
    return function (obj: new () => object) {
        if (description) {
            obj.prototype.$classDescription = description;
        }
    }
}

/**
 * 
 * @param description 
 * 属性的描述
 */
export function propDescripton(description: string) {
    return function (obj: any, propName: string) {
        if (!obj.$propDescriptions) {
            obj.$propDescriptions = [];
        }
        obj.$propDescriptions.push({
            propName,
            description
        })
    }
}

/**
 * 
 * @param obj 
 * 打印描述
 */
export function printObj(obj: any) {
    if (obj.$classDescription) {
        console.log(obj.$classDescription)
    } else {
        console.log('\t' + obj.constructor.name)
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const res = obj.$propDescriptions.find(p => p.propName === key)
            if (res) {
                console.log(`${res.description}:${obj[key]}`)
            } else {
                console.log(`${key}:${obj[key]}`)
            }
        }
    }
}