import { doThing0 } from './functions';
export * from 'package-with-dep-6';

console.log('update #1685569955402');
console.log(doThing0);

export function myFn7() {
    console.log('myFn7');
}