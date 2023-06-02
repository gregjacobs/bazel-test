import { myFn2 } from './index';

describe('test', () => {
    it('should return the correct value', () => {
        expect(myFn2()).toBe('myFn2');
    });
});