import {memoizePromise} from './index';
import { checkServerIdentity } from 'tls';

describe("ts-functional", () => {
    describe("memoizePromise", () => {
        it("should not run the enclosed function for cached values", () => {
            const check = jest.fn();
            const p = (arg:number):Promise<number> => {
                check();
                return Promise.resolve(arg + 1);
            }
            const fn = memoizePromise(p);
            return fn(1).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(2);
                return fn(2);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(3);
                return fn(1);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(2);
            });
        });
        it("should work for functions with multiple arguments", () => {
            const check = jest.fn();
            const p = (a:number, b:number):Promise<number> => {
                check();
                return Promise.resolve(a + b);
            }
            const fn = memoizePromise(p);
            return fn(1, 2).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(3);
                return fn(2, 1);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(3);
                return fn(1, 2);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(3);
            });
        });
        it("should not intermix results between functions", () => {
            const check = jest.fn();
            const p1 = (a:number):Promise<number> => {
                check();
                return Promise.resolve(a + 1);
            };
            const p2 = (a:number):Promise<number> => {
                check();
                return Promise.resolve(a + 2);
            };

            const fn1 = memoizePromise(p1);
            const fn2 = memoizePromise(p2);
            return fn1(1).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(2);
                return fn2(1);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(3);
                return fn1(1);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(2);
            });
        });
    });
});