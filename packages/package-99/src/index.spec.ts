import { myFn99 } from './index';

describe('test', () => {
    it('should return the correct value', () => {
        expect(myFn99()).toBe('myFn99');
    });
});