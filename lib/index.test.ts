import { chunk, juxt, memoizePromise, or, pick, range, sort, omit, matchOn } from './index';

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
    describe("juxt", () => {
        it("should return a tuple of functions applied to an object", () => {
            const str = "abc123";
            const results = juxt(
                (s:string):number => s.length,
                (s:string):string => s.substr(0, 3),
            )(str);
            expect(results[0]).toEqual(6);
            expect(results[1]).toEqual("abc");
        });
    });
    describe("matchOn", () => {
        it("should return objects based on RegEx matches on the source string", () => {
            const convert = matchOn([
                [/^123$/, () => "Matched 123"],
                [/^[0-9]*[a-z]*$/, () => "Matched numbers followed by strings"],
            ], "NO MATCH");
            const tests:{[id:string]:string} = {
                "123": "Matched 123",
                "123abc": "Matched numbers followed by strings",
                "No Match": "NO MATCH",
            }
            Object.keys(tests).forEach((key:string) => {
                expect(convert(key)).toEqual(tests[key]);
            });
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
        it("should catch and cache rejections", () => {
            const check = jest.fn();
            const p = (arg:number):Promise<number> => {
                check();
                return Promise.reject(`${arg}: Error!`);
            }
            const fn = memoizePromise(p);
            return fn(1).catch((err:string) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(err).toEqual("1: Error!");
                return fn(1);
            }).catch((err:string) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(err).toEqual("1: Error!");
                return fn(2);
            }).catch((err:string) => {
                expect(check).toHaveBeenCalledTimes(2);
                expect(err).toEqual("2: Error!");
            });
        });
        it("should not run the enclosed function if it is already being run", () => {
            const check = jest.fn();
            const p = (arg:number):Promise<number> => {
                check();
                return new Promise((resolve:any, reject:any) => {
                    setTimeout(() => {
                        resolve(arg+1);
                    }, 10);
                });
            }
            const fn = memoizePromise(p);
            return Promise.all([fn(1), fn(1), fn(2), fn(1)])
                .then((results:number[]) => {
                    expect(check).toHaveBeenCalledTimes(2);
                    expect(results[0]).toEqual(2);
                    expect(results[1]).toEqual(2);
                    expect(results[2]).toEqual(3);
                    expect(results[3]).toEqual(2);
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
    describe("omit", () => {
        it("should exclude fields", () => {
            interface IPickTest {a:number; b:number; c:string;}
            const obj:IPickTest = {a: 1, b: 2, c: "test"};
            const picked = omit<IPickTest, "a" | "c">("a", "c")(obj);
            expect((picked as any).a).toBeUndefined();
            expect(picked.b).toEqual(2);
            expect((picked as any).c).toBeUndefined()
        })
    });
    describe("or", () =>{
        it("should provide defaults for non-truthy objects", () => {
            expect(or("default")(null)).toEqual("default");
            expect(or("default")(undefined)).toEqual("default");
            expect(or("default")("orig")).toEqual("orig");
        });
    });
    describe("pick", () => {
        it("should extract fields", () => {
            interface IPickTest {a:number; b:number; c:string;}
            const obj:IPickTest = {a: 1, b: 2, c: "test"};
            const picked = pick<IPickTest, "a" | "c">("a", "c")(obj);
            expect(picked.a).toEqual(1);
            expect((picked as any).b).toBeUndefined();
            expect(picked.c).toEqual("test");
        })
    });
    describe("range", () => {
        it("should work", () => {
            expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
        });
        it("should work for negative ranges", () => {
            expect(range(5, 1)).toEqual([5, 4, 3, 2, 1]);
        })
    });
    describe("sort", () => {
        it("should work", () => {
            const orig = ["c", "d", "b", "a"];
            const final = ["a", "b", "c", "d"];
            const sorter = sort((a:string, b:string) => a.localeCompare(b));
            expect(sorter(orig)).toEqual(final);
        });
    });
});