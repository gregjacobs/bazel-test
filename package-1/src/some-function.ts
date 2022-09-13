import { camelCase } from 'lodash';

export function someFunction(param: string): 2 {
    console.log('someFunction!!!!!!!!!!!!!!!!' + camelCase(param) + "@@@@@@");
    return 2;
}