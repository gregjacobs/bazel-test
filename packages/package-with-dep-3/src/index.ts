import { doThing0 } from './functions';
export * from 'package-with-dep-2';

console.log('update #1663361382112');
console.log(doThing0);

export function myFn3() {
    console.log('myFn3');
}