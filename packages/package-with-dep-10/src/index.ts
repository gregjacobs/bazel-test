import { doThing0 } from './functions';
export * from 'package-with-dep-9';

console.log('update #1663361382696 change #4');
console.log(doThing0);

export function myFn10() {
    console.log('myFn10');
}