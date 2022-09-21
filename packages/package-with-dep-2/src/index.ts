import { doThing0 } from './functions';
export * from 'package-with-dep-1';

console.log('update #1663361381966');
console.log(doThing0);

export function myFn2() {
    console.log('myFn2');
}