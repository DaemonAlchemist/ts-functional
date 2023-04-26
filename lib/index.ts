import typeOf from 'type-of';
import { Func, ICompose, IHash, IJuxt, IMemoizeOptions, IMultiMap, IPipe, ISwitch, Index, MatchFunc, Maybe, MaybeNull, Reducer, SyncOrAsync, Tuple, Variadic } from './types';

// Common
export const reduce = <A, B>(r:Reducer<A, B>, def:B):Func<A[], B> => (arr:A[]):B => arr.reduce(r, def);
export const as = <T, U>(obj:T, f:Func<T, U>) => f(obj);
export const prop = <T, U extends keyof T>(prop:U) => (obj:T):T[U] => obj[prop];
export const tuple = {
    first: <A, B>(t:Tuple<A, B>):A => t[0],
    second: <A, B>(t:Tuple<A, B>):B => t[1],
};

export const maybe = <A, B>(f:Func<A,B>):Func<Maybe<A>, Maybe<B>> => (val?:A) => !!val ? f(val) : undefined;

export const makeAsync = <T, U>(f:Func<T, U>):Func<Promise<T>, Promise<U>> => (getT:Promise<T>):Promise<U> => getT.then(f);
export const syncOrAsync = <T, U>(f:Func<T, U>) =>
    (obj:SyncOrAsync<T>):SyncOrAsync<U> => {
        return (typeof (obj as Promise<T>).then !== 'undefined'
            ? (obj as Promise<T>).then(f)
            : f(obj as T)
        ) as any;
    };


// Array functions
export const at = <T>(index:number):Func<T[], Maybe<T>> => (arr:T[]):Maybe<T> => arr[index];
export const chunk = <T>(size:number) => (arr:T[]):T[][] => {
    if(size <= 0) {
        console.error("Chunk expects a size greater than zero");
        return [arr];
    }

    let temp:T[][] = [];
    for(let i=0,j=arr.length; i<j; i+=size) {
        temp.push(arr.slice(i, i+size));
    }
    return temp;
}
export const concat = <T>(item:T | T[]):Func<T[], T[]> => (arr:T[]):T[] => ([] as T[]).concat(arr).concat(item);
export const concatReduce = <T>(acc:T[], item:T):T[] => concat(item)(acc);
export const createIndex = <T, U>(getId:Func<T, string>, transform:Func<T, U>):Func<T[], Index<U>> => (arr:T[]):Index<U> => arr.reduce(
    (acc:Index<U>, cur:T):Index<U> => ({
        ...acc,
        [getId(cur)]: transform(cur)
    }),
    {}
);
export const diff = <T>(arr1:T[], arr2:T[]):T[] => unique(arr1).filter((obj:T) => !arr2.includes(obj));
export const entries = <T>(arr:T[]):IterableIterator<[number, T]> => arr.entries();
export const every = <T>(f:Func<T, boolean>):Func<T[], boolean> => (arr:T[]):boolean => arr.every(f);
export const filter = <T>(f:Func<T, boolean>):Func<T[], T[]> => (arr:T[]):T[] => arr.filter(f);
export const find = <T>(f:Func<T, boolean>):Func<T[], Maybe<T>> => (arr:T[]):Maybe<T> => arr.find(f);
export const findIndex = <T>(f:Func<T, boolean>):Func<T[], number> => (arr:T[]):number => arr.findIndex(f);
export const first = <T>(arr:T[]):Maybe<T> => at<T>(0)(arr);
export const flatten = <T>(arr:T[][]):T[] => reduce((acc:T[], cur:T[]):T[] => ([] as T[]).concat(acc).concat(cur), [])(arr);
export const from = concat([]);
export const includes = <T>(item:T):Func<T[], boolean> => (arr:T[]):boolean => arr.includes(item);
export const indexOf = <T>(item:T, start?:number):Func<T[], number> => (arr:T[]):number => arr.indexOf(item, start);
export const intersection = <T>(arr1:T[], arr2:T[]):T[] => unique(arr1).filter((obj:T) => arr2.includes(obj));
export const joinWith = <T>(sep:string):Func<T[], string> => (arr:T[]):string => arr.join(sep);
export const juxt:IJuxt = (...funcs:any) => (obj:any) => funcs.map((f:any) => f(obj));
export const keys = <T>(arr:T[]):IterableIterator<number> => arr.keys();
export const last = <T>(arr:T[]):Maybe<T> => at<T>(arr.length - 1)(arr);
export const lastIndexOf = <T>(item:T):Func<T[], number> => (arr:T[]):number => arr.lastIndexOf(item);
export const length = <T>(arr:T[]) => arr.length;
export const map = <A, B>(m:Func<A, B>):Func<A[], B[]> => (arr:A[]):B[] => arr.map(m);
export const multiMap:IMultiMap = <T>(f:((...args:any[]) => T)):((...args:any[][]) => T[]) => (...args:any[][]):T[] => {
    const lengths = args.map(length);
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);
    if(min !== max) {
        throw "Multimap requires all arrays to have the same length";
    }

    return range(0, min - 1).map(i => f(...args.map(at(i))));
};

export const partition = <T>(getId:Func<T, string>):Func<T[], IHash<T>> => (arr:T[]):IHash<T> => arr.reduce(
    (acc:IHash<T>, cur:T):IHash<T> => as(getId(cur), (key:string) => ({
        ...acc,
        [getId(cur)]: acc[key] ? concat(cur)(acc[key]) : [cur]
    })),
    {}
);
export const partitionOn = <T>(propName:string) => partition<T>(prop<any, any>(propName));
export const pop = <T>(arr:T[]):Tuple<Maybe<T>, T[]> => {
    let a:T[] = concat([] as T[])(arr);
    const elem:Maybe<T> = a.pop();
    return [elem, a];
}
export const push = <T>(item:T):Func<T[], T[]> => (arr:T[]):T[] => {
    let a:T[] = concat([] as T[])(arr);
    a.push(item);
    return a;
}
export const range = (start:number, end:number):number[] =>
    [...Array(Math.abs(end - start) + 1).keys()]
    .map((_:number, i:number) => start < end ? i + start : start - i);

export const reverse = <T>(arr:T[]):T[] => ([] as T[]).concat(arr).reverse();
export const shift = <T>(arr:T[]):Tuple<Maybe<T>, T[]> => {
    let a:T[] = concat([] as T[])(arr);
    const elem:Maybe<T> = a.shift();
    return [elem, a];
}
export const unshift = <T>(item:T):Func<T[], T[]> => (arr:T[]):T[] => {
    let a:T[] = concat([] as T[])(arr);
    a.unshift(item);
    return a;
}
export const slice = <T>(start?:number, end?:number):Func<T[], T[]> => (arr:T[]):T[] => arr.slice(start, end);
export const splice = <T>(start:number, length?:number) => (arr:T[]):T[] => {
    let newArr:T[] = [...arr];
    newArr.splice(start, length);
    return newArr;
};
export const some = <T>(f:Func<T, boolean>):Func<T[], boolean> => (arr:T[]):boolean => arr.some(f);

const sortInt = <T>(f:(a:T, b:T) => number):Func<T[], T[]> => (arr:T[]):T[] => concat([] as T[])(arr).sort(f);
sortInt.asNumber = {
    asc: (a:number, b:number) => a - b,
    desc: (a:number, b:number) => b - a,
};
sortInt.asText = {
    asc: (a:string, b:string) => a.localeCompare(b),
    desc: (a:string, b:string) => b.localeCompare(a),
};

sortInt.by = <T>(f:Func<T, number> | Func<T, string>) => ({
    asc: (a:T, b:T) => {
        const aVal = f(a);
        const bVal = f(b);
        return typeof aVal === 'number' && typeof bVal === 'number' ? sortInt.asNumber.asc(aVal,      bVal     ) :
               typeof aVal === 'string' && typeof bVal === 'string' ?   sortInt.asText.asc(aVal,      bVal     ) :
                                                                        sortInt.asText.asc(`${aVal}`, `${bVal}`);
            },
    desc: (a:T, b:T) => {
        const aVal = f(a);
        const bVal = f(b);
        return typeof aVal === 'number' && typeof bVal === 'number' ? sortInt.asNumber.desc(aVal,      bVal     ) :
               typeof aVal === 'string' && typeof bVal === 'string' ?   sortInt.asText.desc(aVal,      bVal     ) :
                                                                        sortInt.asText.desc(`${aVal}`, `${bVal}`);
    },
});

export const sort = sortInt;
export const union = <T>(arr1:T[], arr2:T[]):T[] => unique(arr1.concat(arr2));
export const unique = <T>(arr:T[]):T[] => [...new Set(arr)];

// Object methods
export const clone = <T>(obj:T):T => Object.assign({}, obj);
export const or = <T>(def:T) => (obj:T | null | undefined) => obj ? obj : def;

export const pick = <T, K extends keyof T>(...fields:K[]) => (obj:T):Pick<T, K> => {
    const ret = {} as any;
    fields.forEach((key => {
        ret[key] = obj[key];
    }));
    return ret;
};

export const omit = <T, K extends keyof T>(...fields:K[]) => (obj:T):Omit<T, K> => {
    let ret = {...(obj as any)};
    fields.forEach((key => {
        delete ret[key];
    }));
    return ret;
}

export const objMap = <A, B>(f:(obj:A, id: string) => B) =>
    (container:Index<A>):Index<B> =>
    Object.keys(container).reduce(
        (obj:Index<B>, id: string):Index<B> => ({
            ...obj,
            [id]: f(container[id], id)
        }),
        {}
    );

// String functions
export const append = (suffix:string):Func<string, string> => (str:string):string => `${str}${suffix}`;
export const charAt = (index:number):Func<string, string> => (str:string) => str.charAt(index);
export const charCodeAt = (index:number):Func<string, number> => (str:string):number => str.charCodeAt(index);
export const endsWith = (suffix:string):Func<string, boolean> => (str:string):boolean => str.endsWith(suffix);
export const matches = (regex:RegExp):Func<string, MaybeNull<string[]>> => (str:string):MaybeNull<string[]> => str.match(regex);
export const prepend = (prefix:string):Func<string, string> => (str:string):string => `${prefix}${str}`;
export const repeat = (count:number):Func<string, string> => (str:string):string => str.repeat(count);
export const replace = (search:RegExp):Func<string, Func<string, string>> => (replacement:string):Func<string, string> => (str:string) => str.replace(search, replacement);
export const search = (term:string):Func<string, number> => (str:string):number => str.search(term);
export const split = (delim:string | RegExp):Func<string, string[]> => (str:string):string[] => str.split(delim);
export const startsWith = (prefix:string):Func<string, boolean> => (str:string):boolean => str.startsWith(prefix);
export const substr = (start:number, len?:number):Func<string, string> => (str:string):string => str.substr(start, len);
export const toLowerCase = (str:string):string => str.toLowerCase();
export const toLocaleLowerCase = (str:string):string => str.toLocaleLowerCase();
export const toUpperCase = (str:string):string => str.toUpperCase();
export const toLocaleUpperCase = (str:string):string => str.toLocaleUpperCase();
export const trim = (str:string):string => str.trim();

// checks
export const isEmpty = <T>(obj:T):boolean => obj ? false : true;
export const isNotEmpty = <T>(obj:T):boolean => obj ? true : false;

// Helpers
export const debug = <T>(obj:T):T => {console.log(obj); return obj;}
export const identity = <T>(obj:T):T => obj;
export const get = <T>(obj:T):Func<undefined, T> => ():T => obj;
export const arg = <T>(index:number):((...args:any[]) => T) => (...args:any[]) => args[index] as T;
export const args = <T>(...indices:number[]):((...args:any[]) => T) => (...args:any[]):T => indices.map(i => args[i]) as unknown as T;

export const switchOn = <T>(key:string | number, actions:ISwitch<T>):Maybe<T> => (actions[key] || actions.default || (() => undefined))();
export const typeSwitch = <T>(obj:any, actions:ISwitch<T>):Maybe<T> => switchOn(typeOf(obj), actions);

export const matchOn = <T>(
    actions:MatchFunc<T>[],
    defaultValue:T,
    disambiguator?:(matches:MatchFunc<T>[]) => MatchFunc<T>
):((str:string) => T) => (str:string):T => {
    const multiMatchFixer = disambiguator || ((matches:MatchFunc<T>[]):MatchFunc<T> => matches[0]);
    const matches = actions.filter((action) => tuple.first(action).test("" + str));
    return matches.length === 1 ? tuple.second(matches[0])() :
           matches.length > 1   ? tuple.second(multiMatchFixer(matches))() :
           defaultValue;
}

// Function composition
export const compose:ICompose = <A, B>(...funcs:Func<any, any>[]):Func<A, B> => (obj:A):B => funcs.reduceRight(
    (acc:any, cur:any) => cur(acc),
    obj
);

export const pipe:IPipe = <A, B>(...funcs:Func<any, any>[]):Func<A, B> => (obj:A):B => funcs.reduce(
    (acc:any, cur:any) => cur(acc),
    obj
);

// Convert a function that takes arguments into an argumentless callback function
export const callback = <T extends any[], R>(f:(...args:T) => R):((...args:T) => () => R) => (...args:T) => () => f(...args); 

// "Compose" argumentless functions into one function that runs them all
export const all = (...funcs:Array<() => void>) => () => {
    funcs.forEach(f => {f()});
}

// Other helpers
export const memoize = <A extends any[], B, C = any>(f:Variadic<A, B>, options: IMemoizeOptions<A, B, C>):Variadic<A, B> => {
    const keyGen = options && options.keyGen ? options.keyGen : stringify;
    const queueInvalidation = options && options.queueInvalidation ? options.queueInvalidation : (() => {});
    const results:Index<B> = {};
    return (...args:A):B => {
        const key:string = keyGen(args);
        if(typeof results[key] === 'undefined') {
            results[key] = f(...args);
            queueInvalidation(() => {delete results[key];}, key, results[key]);
        }
        return results[key];
    }
}

export const memoizePromise = <A extends any[], B, C = any>(f:Variadic<A, Promise<B>>, options?: IMemoizeOptions<A, B, C>):Variadic<A, Promise<B>> => {
    const keyGen = options && options.keyGen ? options.keyGen : JSON.stringify;
    const queueInvalidation = options && options.queueInvalidation ? options.queueInvalidation : (() => {});
    const getInvalidator = options && options.getInvalidator ? options.getInvalidator : (() => {});
    const results:Index<B> = {};
    const errors:Index<C> = {};
    const isSuccess:Index<boolean> = {};
    const isRunning:Index<boolean> = {};
    const resolvers:Index<((value:B) => void)[]> = {};
    const rejecters:Index<((value:C) => void)[]> = {};
    return (...args:A):Promise<B> => {
        const key:string = keyGen(args);
        if(typeof results[key] === 'undefined' && typeof errors[key] === 'undefined') {
            const p = new Promise<B>((resolve:(result:B) => void, reject:(err:C) => void) => {
                if(!Array.isArray(resolvers[key])) { resolvers[key] = [];}
                if(!Array.isArray(rejecters[key])) { rejecters[key] = [];}
                resolvers[key].push(resolve);
                rejecters[key].push(reject);
            });
            if(!isRunning[key]) {
                isRunning[key] = true;
                const invalidate = () => {
                    delete results[key];
                    delete errors[key];
                    delete isSuccess[key];
                };
                f(...args).then((result:B) => {
                    isRunning[key] = false;
                    results[key] = result;
                    isSuccess[key] = true;
                    queueInvalidation(invalidate, key, result, undefined);
                    getInvalidator(invalidate);
                    resolvers[key].forEach((r:(value:B) => void) => {r(result);});
                    resolvers[key] = [];
                    rejecters[key] = [];
                }).catch((err:C) => {
                    isRunning[key] = false;
                    errors[key] = err;
                    isSuccess[key] = false;
                    queueInvalidation(invalidate, key, undefined, err);
                    getInvalidator(invalidate);
                    rejecters[key].forEach((r:(value:C) => void) => {r(err);});
                    resolvers[key] = [];
                    rejecters[key] = [];
                });
            }
            return p;
        }
        return isSuccess[key] ? Promise.resolve(results[key]) : Promise.reject(errors[key]);
    }
}
