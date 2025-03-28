import {
    all, arg, args, callback, chunk, diff, intersection, juxt, matchOn, maybe, defaultValue, pipeTo,
    memoizePromise, merge, multiMap, objFilter, objMap, omit, or, pick, prop, range, sort, union,
} from './index';

// Override console log for testing
let log:string[] = [];
let error:string[] = [];
console.clear = () => {
    log = [];
}
console.log = jest.fn((msg:string) => {log.push(msg)});
console.error = jest.fn((msg:string) => {error.push(msg)});

describe("ts-functional", () => {
    describe("all", () => {
        it("should combine functions into one callback", () => {
            const a = jest.fn();
            const b = jest.fn();
            const combined = all(a, b);
            expect(a).toBeCalledTimes(0);
            expect(b).toBeCalledTimes(0);
            combined();
            expect(a).toHaveBeenCalled();
            expect(b).toHaveBeenCalled();
        })
    });
    describe("defaultValue", () => {
        it("should return the default value if the input is undefined", () => {
            expect(defaultValue("default")(undefined)).toEqual("default");
        });
        it("should return the input value if it is not undefined", () => {
            expect(defaultValue("default")("input")).toEqual("input");
        });
    });
    describe("callback", () => {
        it("should create a callback from a function", () => {
            const add = (a:number, b:number) => a + b;
            const addCallback = callback(add);
            expect(addCallback(1, 2)()).toEqual(3);
        })
    });
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
    describe("diff", () => {
        it("should return the difference of two arrays", () => {
            const arr1:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            const arr2:number[] = [1, 3, 5, 7, 9];
            expect(diff(arr1, arr2)).toEqual([2, 4, 6, 8, 0]);
        });
        it("should return only unique values", () => {
            const arr1:number[] = [1, 1, 2, 3];
            const arr2:number[] = [2];
            expect(diff(arr1, arr2)).toEqual([1, 3]);
        });
        it("should remove all occurences of a removed value", () => {
            const arr1:number[] = [1, 2, 3, 4, 5, 1, 6, 7, 3, 8, 5, 9, 7, 0, 9];
            const arr2:number[] = [1, 3, 5, 7, 9];
            expect(diff(arr1, arr2)).toEqual([2, 4, 6, 8, 0]);
        });
        it("should return the original array if the other array is empty", () => {
            const arr1:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            const arr2:number[] = [];
            expect(diff(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        });
        it("should return the original array if the other array doesn't contain any of its values", () => {
            const arr1:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            const arr2:number[] = [10, 11, 12, 13];
            expect(diff(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        });
        it("should return the original array if the original array is empty", () => {
            const arr1:number[] = [];
            const arr2:number[] = [3, 4, 5];
            expect(diff(arr1, arr2)).toEqual([]);
        });
        it("should return the original array if both arrays are empty", () => {
            const arr1:number[] = [];
            const arr2:number[] = [];
            expect(diff(arr1, arr2)).toEqual([]);
        });
    });
    describe("intersection", () => {
        it("should return only elements in both arrays", () => {
            const arr1 = [1, 2, 3, 4, 5];
            const arr2 = [1, 3, 5, 7, 9];
            expect(intersection(arr1, arr2)).toEqual([1, 3, 5]);
        });
        it("should return only unique elements", () => {
            const arr1 = [1, 1, 2, 3, 4, 5];
            const arr2 = [1, 3, 5, 7, 9];
            expect(intersection(arr1, arr2)).toEqual([1, 3, 5]);
        });
        it("should return an empty array if either array is empty", () => {
            const arr1 = [1, 2, 3, 4, 5];
            const arr2:number[] = [];
            expect(intersection(arr1, arr2)).toEqual([]);
            expect(intersection(arr2, arr1)).toEqual([]);
        });
        it("should return an empty array if both arrays are empty", () => {
            expect(intersection([], [])).toEqual([]);
        });
        it("should return an empty array if the arrays have no elements in common", () => {
            const arr1 = [2, 4, 6, 8, 0];
            const arr2 = [1, 3, 5, 7, 9];
            expect(intersection(arr1, arr2)).toEqual([]);
        });
        it("should return the full array if both arrays are identical", () => {
            const arr1 = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5];
            expect(intersection(arr1, arr2)).toEqual([1, 2, 3, 4, 5]);
        });
    });
    describe("union", () => {
        it("should return all unique elements in both arrays", () => {
            const arr1 = [1, 2, 3, 4, 5];
            const arr2 = [6, 7, 8, 9, 0];
            expect(union(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        });
        it("should remove duplicate values", () => {
            const arr1 = [1, 2, 3, 3, 4, 5];
            const arr2 = [6, 7, 8, 9, 4, 0];
            expect(union(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        });
    });
    describe("multiMap", () => {
        it("should map multiple arrays into a single result", () => {
            const first = [1, 2, 3];
            const second = [4, 5, 6];
            const third = [7, 8, 9];
            const add = multiMap((a: number, b:number, c:number) => a + b + c);
            const results = add(first, second, third);
            expect(results).toEqual([12, 15, 18]);
        })
    });
    describe("maybe", () => {
        it("should convert a function taking a value into one that can also take an undefined value", () => {
            const getA = prop<{a: number}, "a">("a"); 
            const getAIfExists = maybe(getA);
            expect(getA({a: 2})).toEqual(2);
            expect(getAIfExists(undefined)).toEqual(undefined);
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
        it("should allow the results to be invalidated after a certain time", () => {
            const check = jest.fn();
            const p = (arg:number):Promise<number> => {
                check();
                return Promise.resolve(arg + 1);
            }
            const fn = memoizePromise(p, {ttl: 10});
            return fn(1).then((result:number) => {
                // Make sure the function is called once
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(2);
                return fn(1);
            }).then((result:number) => {
                // Make sure the result is cached
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(2);

                // Wait for the cache to expire
                return new Promise<number>((resolve:any) => {
                    setTimeout(() => {
                        resolve(fn(1));
                    }, 20);
                });
            }).then((result:number) => {
                // Make sure the function is called again
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(2);
                return fn(1);
            }).then((result:number) => {
                // Make sure the result is re-cached
                expect(check).toHaveBeenCalledTimes(2);
                expect(result).toEqual(2);
            });
        });
        it("should allow the results to be manually invalidated", () => {
            const check = jest.fn();
            const p = (arg:number):Promise<number> => {
                check();
                return Promise.resolve(arg + 1);
            }
            let invalidate:() => void;
            const getInvalidator = (i:() => void) => {
                invalidate = i;
            }
            const fn = memoizePromise(p, {getInvalidator});
            return fn(1).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(2);
                return fn(1);
            }).then((result:number) => {
                expect(check).toHaveBeenCalledTimes(1);
                expect(result).toEqual(2);
                invalidate();
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
    describe("objMap", () => {
        it("should map objects", () => {
            const orig = {a: 1, b: 2, c: 3};
            const final = {a: "a:1", b: "b:2", c: "c:3"};
            const f = (value: number, id: string) => `${id}:${value}`;
            expect(JSON.stringify(objMap(f)(orig))).toEqual(JSON.stringify(final));
        })
    });
    describe("objFilter", () => {
        it("should filter object", () => {
            const orig = {a: 1, b: 2, c: 3};
            const final = {a:1, c:3};
            const f = (value:number, id:string) => value !== 2;
            expect(JSON.stringify(objFilter(f)(orig))).toEqual(JSON.stringify(final));
        });
    });
    describe("merge", () => {
        it("should merge objects by key", () => {
            const one = {a: 1, b: 2};
            const two = {c: 3, d: 4};
            const combined = merge(one, two);
            expect(combined.a).toEqual(1);
            expect(combined.b).toEqual(2);
            expect(combined.c).toEqual(3);
            expect(combined.d).toEqual(4);
        });
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
        describe("wrapper", () => {
            it("should work", () => {
                const orig = ["c", "d", "b", "a"];
                const final = ["a", "b", "c", "d"];
                const sorter = sort((a:string, b:string) => a.localeCompare(b));
                expect(sorter(orig)).toEqual(final);
            });
        });
        describe("sort.asText.asc", () => {
            it("should work", () => {
                const orig = ["c", "d", "b", "a"];
                const final = ["a", "b", "c", "d"];
                const sorter = sort(sort.asText.asc);
                expect(sorter(orig)).toEqual(final);
            });
        });
        describe("sort.asText.desc", () => {
            it("should work", () => {
                const orig = ["c", "d", "b", "a"];
                const final = ["d", "c", "b", "a"];
                const sorter = sort(sort.asText.desc);
                expect(sorter(orig)).toEqual(final);
            });
        });
        describe("sort.asNumber.asc", () => {
            it("should work", () => {
                const orig = [3, 4, 2, 1];
                const final = [1, 2, 3, 4];
                const sorter = sort(sort.asNumber.asc);
                expect(sorter(orig)).toEqual(final);
            });
        });
        describe("sort.asNumber.desc", () => {
            it("should work", () => {
                const orig = [3, 4, 2, 1];
                const final = [4, 3, 2, 1];
                const sorter = sort(sort.asNumber.desc);
                expect(sorter(orig)).toEqual(final);
            });
        });
        describe("sort.by.asc", () => {
            it("should work", () => {
                const orig:Array<{a: number}> = [{a: 3}, {a: 4}, {a: 2}, {a: 1}];
                const final:Array<{a: number}> = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
                const sorter = sort(sort.by(prop<{a: number}, "a">("a")).asc);
                expect(sorter(orig)).toEqual(final);
            });
        });
        describe("sort.by.desc", () => {
            it("should work", () => {
                const orig:Array<{a: number}> = [{a: 3}, {a: 4}, {a: 2}, {a: 1}];
                const final:Array<{a: number}> = [{a: 4}, {a: 3}, {a: 2}, {a: 1}];
                const sorter = sort(sort.by(prop<{a: number}, "a">("a")).desc);
                expect(sorter(orig)).toEqual(final);
            });
        });
    });
    describe("arg", () => {
        it('should return the specified argument', () => {
            expect(arg<number>(0)(0, 1, 2, 3)).toEqual(0);
            expect(arg<number>(1)(0, 1, 2, 3)).toEqual(1);
            expect(arg<number>(2)(0, 1, 2, 3)).toEqual(2);
            expect(arg<number>(3)(0, 1, 2, 3)).toEqual(3);
            expect(arg<number>(4)(0, 1, 2, 3)).toEqual(undefined);
            expect(arg<number>(-1)(0, 1, 2, 3)).toEqual(undefined);
        })
    });
    describe("args", () => {
        it("should return the specified arguments", () => {
            expect(args<[number, string]>(0, 1)(0, "one", "two", 3)).toEqual([0, "one"]);
            expect(args<[number, string]>(0, 2)(0, "one", "two", 3)).toEqual([0, "two"]);
        })
    });
    describe("pipeTo", () => {
        it("should return a function that extracts info from its arguments and sends it to another function", () => {
            const add = (a:number, b:number) => a + b;
            const double = (a:number) => a * 2;
            const triple = (a:number) => a * 3;
            const timesFive = pipeTo(add, double, triple);
            expect(timesFive(1)).toEqual(5);
        });
        it("should work with multiple arguments", () => {
            const triple = (a:number) => a * 3;
            const add = (a:number, b:number) => a + b;
            const process = pipeTo(triple, add);
            expect(process(1, 2)).toEqual(9);
        });
        it("should work with multiple arguments and multiple functions", () => {
            const triple = (a:number) => a * 3;
            const add = (a:number, b:number) => a + b;
            const sub = (a:number, b:number) => a - b;
            const mult = (a:number, b:number) => a * b;
            const process = pipeTo(mult, add, sub);
            expect(process(4, 1)).toEqual(15);
        });
        it("should work with arguments of multiple types", () => {
            const concat = (a:string, b:number) => `${a}:${b}`;
            const sign = (a:number) => a < 0 ? "negative" : "positive";
            const double = (a:number) => a * 2;
            const process = pipeTo(concat, sign, double);
            expect(process(2)).toEqual("positive:4");
            expect(process(-2)).toEqual("negative:-4");
        });
        it("should work with multiple arguments of multiple types", () => {
            const concat = (a:string, b:number) => `${a}:${b}`;
            const sign = (a:number, b:string) => a < 0 ? `negative-${b}` : `positive-${b}`;
            const double = (a:number, b:string) => a * 2;
            const process = pipeTo(concat, sign, double);
            expect(process(2, "two")).toEqual("positive-two:4");
            expect(process(-2, "two")).toEqual("negative-two:-4");
        });
    });
});