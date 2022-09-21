import { doThing0 } from './functions';
export * from 'package-with-dep-5';

console.log('update #1663361382388');
console.log(doThing0);

export function myFn6() {
    console.log('myFn6');
}