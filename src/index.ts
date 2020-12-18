import {dictionary} from './dictionary';
const d = new dictionary<string,number>();
d.set("a",1);
d.set("b",1);
d.set("a",2);
d.forEach((k,v) => {
    console.log(k,v)
})
d.delete('a');

d.forEach((k,v) => {
    console.log(k,v)
})
console.log(d.hasKey('b'));
d.set("a",2);
console.log(d.size);