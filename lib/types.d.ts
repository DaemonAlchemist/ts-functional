type Func<A, B> = (obj:A) => B;
type Mapper<A, B> = Func<A, B>;
type Filter<A> = (obj:A) => boolean;
type Reducer<A, B> = (acc:B, cur:A) => B;
type Transducer<A, B, C> = (r:Reducer<B, C>) => Reducer<A, C>;
type TransducerCreator<A, B, C> = (r:Reducer<A, B>) => Transducer<A, B, C>;

interface Index<T> {
    [key:string]:T;
}
interface IHash<T> {
    [key:string]:T[];
}
type Maybe<T> = T | undefined;
type MaybeNull<T> = T | null;
type Tuple<A, B> = [A, B];
type Just<T> = T;
type SyncOrAsync<T> = T | Promise<T>;
interface ISwitch<T> {
    default: () => T;
    [key:string]: () => T;
    [key:number]:  () => T;
}
interface ICompose {
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

interface IPipe {
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
