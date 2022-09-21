import { doThing0 } from './functions';
export * from 'package-with-dep-4';

console.log('update #1663361382255');
console.log(doThing0);

export function myFn5() {
    console.log('myFn5');
}