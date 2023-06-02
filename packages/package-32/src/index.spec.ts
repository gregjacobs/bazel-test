import { myFn32 } from './index';

describe('test', () => {
    it('should return the correct value', () => {
        expect(myFn32()).toBe('myFn32');
    });
});