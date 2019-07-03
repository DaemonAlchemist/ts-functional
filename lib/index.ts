// Common
export const reduce = <A, B>(r:Reducer<A, B>, def:B):Func<A[], B> => (arr:A[]):B => arr.reduce(r, def);
export const as = <T, U>(obj:T, f:Func<T, U>) => f(obj);
export const prop = <T, U extends keyof T>(prop:U) => (obj:T):T[U] => obj[prop];
export const tuple = {
    first: <A, B>(t:Tuple<A, B>):A => t[0],
    second: <A, B>(t:Tuple<A, B>):B => t[1],
};


// Array functions
export const at = <T>(index:number):Func<T[], Maybe<T>> => (arr:T[]):Maybe<T> => arr[index];
export const concat = <T>(item:T | T[]):Func<T[], T[]> => (arr:T[]):T[] => ([] as T[]).concat(arr).concat(item);
export const createIndex = <T, U>(getId:Func<T, string>, transform:Func<T, U>):Func<T[], Index<U>> => (arr:T[]):Index<U> => arr.reduce(
    (acc:Index<U>, cur:T):Index<U> => ({
        ...acc,
        [getId(cur)]: transform(cur)
    }),
    {}
);
export const entries = <T>(arr:T[]):IterableIterator<[number, T]> => arr.entries();
export const every = <T>(f:Func<T, boolean>):Func<T[], boolean> => (arr:T[]):boolean => arr.every(f);
export const filter = <T>(f:Func<T, boolean>):Func<T[], T[]> => (arr:T[]):T[] => arr.filter(f);
export const find = <T>(f:Func<T, boolean>):Func<T[], Maybe<T>> => (arr:T[]):Maybe<T> => arr.find(f);
export const findIndex = <T>(f:Func<T, boolean>):Func<T[], number> => (arr:T[]):number => arr.findIndex(f);
export const first = at(0);
export const flatten = <T>(arr:T[][]):T[] => reduce((acc:T[], cur:T[]):T[] => ([] as T[]).concat(acc).concat(cur), [])(arr);
export const from = concat([]);
export const includes = <T>(item:T):Func<T[], boolean> => (arr:T[]):boolean => arr.includes(item);
export const indexOf = <T>(item:T, start?:number):Func<T[], number> => (arr:T[]):number => arr.indexOf(item, start);
export const joinWith = <T>(sep:string):Func<T[], string> => (arr:T[]):string => arr.join(sep);
// TODO: juxt
export const keys = <T>(arr:T[]):IterableIterator<number> => arr.keys();
export const last = <T>(arr:T[]):Maybe<T> => at<T>(arr.length - 1)(arr);
export const lastIndexOf = <T>(item:T):Func<T[], number> => (arr:T[]):number => arr.lastIndexOf(item);
export const map = <A, B>(m:Func<A, B>):Func<A[], B[]> => (arr:A[]):B[] => arr.map(m);
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
    Array(Math.abs(end - start) + 1)
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
export const sort = <T>(f:Func<T, number>):Func<T[], T[]> => (arr:T[]):T[] => concat([] as T[])(arr).sort(f);
export const unique = <T>(arr:T[]):T[] => [...new Set(arr)];

// Object methods
export const clone = <T>(obj:T):T => Object.assign({}, obj);

// Helpers
export const debug = <T>(obj:T):T => {console.log(obj); return obj;}
export const identity = <T>(obj:T):T => obj;
export const get = <T>(obj:T):Func<undefined, T> => ():T => obj;
export const stringify = <T>(obj:T):string => JSON.stringify(obj);

// Function composition
export const compose:ICompose = <A, B>(...funcs:Func<any, any>[]):Func<A, B> => (obj:A):B => reverse(funcs).reduce(
    (acc:any, cur:any) => cur(acc),
    obj
);

export const pipe:IPipe = <A, B>(...funcs:Func<any, any>[]):Func<A, B> => (obj:A):B => funcs.reduce(
    (acc:any, cur:any) => cur(acc),
    obj
);

// Other helpers
export const memoize = <A, B>(f:Func<A, B>, keyGen:Func<A, string> = stringify):Func<A, B> => {
    const results:Index<B> = {};
    return (arg:A):B => {
        const key:string = keyGen(arg);
        if(typeof results[key] !== 'undefined') {
            results[key] = f(arg);
        }
        return results[key];
    }
}

export const memoizePromise = <A, B>(f:Func<A, Promise<B>>, keyGen:Func<A, string> = stringify):Func<A, Promise<B>> => {
    const results:Index<B> = {};
    return (arg:A):Promise<B> => {
        const key:string = keyGen(arg);
        if(typeof results[key] !== 'undefined') {
            return f(arg).then((result:B):Promise<B> => {
                results[key] = result;
                return Promise.resolve(results[key]);
            });
        }
        return Promise.resolve(results[key]);
    }
}
