import { doThing0 } from './functions';
export * from 'package-with-dep-4';

console.log('update #1685569955275');
console.log(doThing0);

export function myFn5() {
    console.log('myFn5');
}