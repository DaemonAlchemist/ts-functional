import {chunk, memoizePromise} from './index';

// Override console log for testing
let log:string[] = [];
let error:string[] = [];
console.clear = () => {
    log = [];
}
console.log = jest.fn((msg:string) => {log.push(msg)});
console.error = jest.fn((msg:string) => {error.push(msg)});

describe("ts-functional", () => {
    describe("chunk", () => {
        it("should split an array", () => {
            const orig = [1, 2, 3, 4, 5, 6, 7, 8];
            const chunked = chunk(2)(orig);
            expect(chunked).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]]);
        });
        it("should split an array with a partial for the last result", () => {
            const orig = [1, 2, 3, 4, 5, 6, 7];
            const chunked = chunk(4)(orig);
            expect(chunked).toEqual([[1, 2, 3, 4], [5, 6, 7]]);
        });
        it("should throw an error and return the original array with a chunk size of zero", () => {
            const orig = [1, 2, 3, 4, 5, 6, 7];
            console.clear();
            const chunked = chunk(0)(orig);
            expect(chunked).toEqual([[1, 2, 3, 4, 5, 6, 7]]);
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(error).toEqual(["Chunk expects a size greater than zero"]);
        });
        it("should return an empty array if the original array is empty", () => {
            const chunked = chunk(2)([]);
            expect(chunked).toEqual([]);
        });
        it("should return one chunk if the chunk size is greater than the length of the input array", () => {
            const orig = [1, 2, 3, 4, 5, 6, 7];
            const chunked = chunk(10)(orig);
            expect(chunked).toEqual([[1, 2, 3, 4, 5, 6, 7]]);
        });
    });
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