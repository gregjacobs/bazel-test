import { myFn42 } from './index';

describe('test', () => {
    it('should return the correct value', () => {
        expect(myFn42()).toBe('myFn42');
    });
});