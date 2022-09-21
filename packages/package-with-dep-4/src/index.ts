import { doThing0 } from './functions';
export * from 'package-with-dep-3';

console.log('update #1663361382177');
console.log(doThing0);

export function myFn4() {
    console.log('myFn4');
}