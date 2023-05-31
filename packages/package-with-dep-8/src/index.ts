import { doThing0 } from './functions';
export * from 'package-with-dep-7';

console.log('update #1685569955493');
console.log(doThing0);

export function myFn8() {
    console.log('myFn8');
}