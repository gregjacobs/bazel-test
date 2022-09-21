import { doThing0 } from './functions';
export * from 'package-with-dep-8';

console.log('update #1663361382620');
console.log(doThing0);

export function myFn9() {
    console.log('myFn9');
}