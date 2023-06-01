import { myFn1 } from 'pnpm-package-1';

console.log('update #1685569964930');

export function myFn2() {
    console.log(myFn1() + '_myFn2');
}