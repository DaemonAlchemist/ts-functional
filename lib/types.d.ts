export declare type Func<A, B> = (obj:A) => B;
export declare type Variadic<A extends any[], B> = (...args:A) => B;
export declare type Mapper<A, B> = Func<A, B>;
export declare type Filter<A> = (obj:A) => boolean;
export declare type Reducer<A, B> = (acc:B, cur:A) => B;
export declare type Transducer<A, B, C> = (r:Reducer<B, C>) => Reducer<A, C>;
export declare type TransducerCreator<A, B, C> = (r:Reducer<A, B>) => Transducer<A, B, C>;

export declare interface Index<T> {
    [key:string]:T;
}
export declare interface IHash<T> {
    [key:string]:T[];
}
export declare type Maybe<T> = T | undefined;
export declare type MaybeNull<T> = T | null;
export declare type Tuple<A, B> = [A, B];
export declare type Just<T> = T;
export declare type SyncOrAsync<T> = T | Promise<T>;
export declare interface ISwitch<T> {
    default: () => T;
    [key:string]: () => T;
    [key:number]:  () => T;
}

export declare type MatchFunc<T> = Tuple<RegExp, () => T>;

export declare interface IMemoizeOptions<A, B, C> {
    ttl?: number;
    keyGen?:Func<A, string>;
    queueInvalidation?:MemoizeInvalidator<B, C>;
    getInvalidator?: (invalidate:() => void) => void;
}
export declare type MemoizeInvalidator<A, B> = (invalidate:Func<void, void>, key:string, result?:A, err?:B) => void;
export declare interface IMultiMap {
    <T, A, B>(f1:(arr1:A, arr2:B) => T):(arr1:A[], arr2:B[]) => T[];
    <T, A, B, C>(f1:(arr1:A, arr2:B, arr3:C) => T):(arr1:A[], arr2:B[], arr3:C[]) => T[];
    <T, A, B, C, D>(f1:(arr1:A, arr2:B, arr3:C, arr4:D) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[]) => T[];
    <T, A, B, C, D, E>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[]) => T[];
    <T, A, B, C, D, E, F>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[]) => T[];
    <T, A, B, C, D, E, F, G>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[]) => T[];
    <T, A, B, C, D, E, F, G, H>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[]) => T[];
    <T, A, B, C, D, E, F, G, H, I>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J, K>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J, arr11:K) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[], arr11:K[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J, K, L>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J, arr11:K, arr12:L) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[], arr11:K[], arr12:L[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J, arr11:K, arr12:L, arr13:M) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[], arr11:K[], arr12:L[], arr13:M[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M, N>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J, arr11:K, arr12:L, arr13:M, arr14:N) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[], arr11:K[], arr12:L[], arr13:M[], arr14:N[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J, arr11:K, arr12:L, arr13:M, arr14:N, arr15:O) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[], arr11:K[], arr12:L[], arr13:M[], arr14:N[], arr15:O[]) => T[];
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(f1:(arr1:A, arr2:B, arr3:C, arr4:D, arr5:E, arr6:F, arr7:G, arr8:H, arr9:I, arr10:J, arr11:K, arr12:L, arr13:M, arr14:N, arr15:O, arr16:P) => T):(arr1:A[], arr2:B[], arr3:C[], arr4:D[], arr5:E[], arr6:F[], arr7:G[], arr8:H[], arr9:I[], arr10:J[], arr11:K[], arr12:L[], arr13:M[], arr14:N[], arr15:O[], arr16:P[]) => T[];
}

export declare interface IJuxt {
    <T, A, B>(f1:Func<T, A>, f2:Func<T, B>):Func<T, [A, B]>;
    <T, A, B, C>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>):Func<T, [A, B, C]>;
    <T, A, B, C, D>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>):Func<T, [A, B, C, D]>;
    <T, A, B, C, D, E>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>):Func<T, [A, B, C, D, E]>;
    <T, A, B, C, D, E, F>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>):Func<T, [A, B, C, D, E, F]>;
    <T, A, B, C, D, E, F, G>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>):Func<T, [A, B, C, D, E, F, G]>;
    <T, A, B, C, D, E, F, G, H>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>):Func<T, [A, B, C, D, E, F, G, H]>;
    <T, A, B, C, D, E, F, G, H, I>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>):Func<T, [A, B, C, D, E, F, G, H, I]>;
    <T, A, B, C, D, E, F, G, H, I, J>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>):Func<T, [A, B, C, D, E, F, G, H, I, J]>;
    <T, A, B, C, D, E, F, G, H, I, J, K>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>, f11:Func<T, K>):Func<T, [A, B, C, D, E, F, G, H, I, J, K]>;
    <T, A, B, C, D, E, F, G, H, I, J, K, L>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>, f11:Func<T, K>, f12:Func<T, L>):Func<T, [A, B, C, D, E, F, G, H, I, J, K, L]>;
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>, f11:Func<T, K>, f12:Func<T, L>, f13:Func<T, M>):Func<T, [A, B, C, D, E, F, G, H, I, J, K, L, M]>;
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M, N>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>, f11:Func<T, K>, f12:Func<T, L>, f13:Func<T, M>, f14:Func<T, N>):Func<T, [A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>, f11:Func<T, K>, f12:Func<T, L>, f13:Func<T, M>, f14:Func<T, N>, f15:Func<T, O>):Func<T, [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
    <T, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(f1:Func<T, A>, f2:Func<T, B>, f3:Func<T, C>, f4:Func<T, D>, f5:Func<T, E>, f6:Func<T, F>, f7:Func<T, G>, f8:Func<T, H>, f9:Func<T, I>, f10:Func<T, J>, f11:Func<T, K>, f12:Func<T, L>, f13:Func<T, M>, f14:Func<T, N>, f15:Func<T, O>, f16:Func<T, P>):Func<T, [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]>;
}

export declare interface ICompose {
    <A, B>(f1:Func<A, B>):Func<A, B>;
    <A, T2, B>(f2:Func<T2, B>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, B>(f3:Func<T3, B>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, B>(f4:Func<T4, B>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, B>(f5:Func<T5, B>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, B>(f6:Func<T6, B>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, B>(f7:Func<T7, B>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, B>(f8:Func<T8, B>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, B>(f9:Func<T9, B>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, B>(f10:Func<T10, B>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, B>(f11:Func<T11, B>, f10:Func<T10, T11>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, B>(f12:Func<T12, B>, f11:Func<T11, T12>, f10:Func<T10, T11>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, B>(f13:Func<T13, B>, f12:Func<T12, T13>, f11:Func<T11, T12>, f10:Func<T10, T11>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, B>(f14:Func<T14, B>, f13:Func<T13, T14>, f12:Func<T12, T13>, f11:Func<T11, T12>, f10:Func<T10, T11>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, B>(f15:Func<T15, B>, f14:Func<T14, T15>, f13:Func<T13, T14>, f12:Func<T12, T13>, f11:Func<T11, T12>, f10:Func<T10, T11>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, B>(f16:Func<T16, B>, f15:Func<T15, T16>, f14:Func<T14, T15>, f13:Func<T13, T14>, f12:Func<T12, T13>, f11:Func<T11, T12>, f10:Func<T10, T11>, f9:Func<T9, T10>, f8:Func<T8, T9>, f7:Func<T7, T8>, f6:Func<T6, T7>, f5:Func<T5, T6>, f4:Func<T4, T5>, f3:Func<T3, T4>, f2:Func<T2, T3>, f1:Func<A, T2>):Func<A, B>;
}

export declare interface IPipe {
    <A, B>(f1:Func<A, B>):Func<A, B>;
    <A, T2, B>(f1:Func<A, T2>, f2:Func<T2, B>):Func<A, B>;
    <A, T2, T3, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, B>):Func<A, B>;
    <A, T2, T3, T4, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, B>):Func<A, B>;
    <A, T2, T3, T4, T5, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, T11>, f11:Func<T11, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, T11>, f11:Func<T11, T12>, f12:Func<T12, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, T11>, f11:Func<T11, T12>, f12:Func<T12, T13>, f13:Func<T13, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, T11>, f11:Func<T11, T12>, f12:Func<T12, T13>, f13:Func<T13, T14>, f14:Func<T14, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, T11>, f11:Func<T11, T12>, f12:Func<T12, T13>, f13:Func<T13, T14>, f14:Func<T14, T15>, f15:Func<T15, B>):Func<A, B>;
    <A, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, B>(f1:Func<A, T2>, f2:Func<T2, T3>, f3:Func<T3, T4>, f4:Func<T4, T5>, f5:Func<T5, T6>, f6:Func<T6, T7>, f7:Func<T7, T8>, f8:Func<T8, T9>, f9:Func<T9, T10>, f10:Func<T10, T11>, f11:Func<T11, T12>, f12:Func<T12, T13>, f13:Func<T13, T14>, f14:Func<T14, T15>, f15:Func<T15, T16>, f16:Func<T16, B>):Func<A, B>;
}
