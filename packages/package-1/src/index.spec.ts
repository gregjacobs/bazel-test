import { myFn1 } from './index';

describe('test', () => {
    it('should return the correct value', () => {
        expect(myFn1()).toBe('myFn1');
    });
});