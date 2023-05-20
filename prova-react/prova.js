
export function sum(a,b){
    return a+b;
}
export function sub(a,b){
    return a-b;
}

export function fun(a,b){

    const somma=sum(a,b);
    const diff= sub(somma,a);

    return diff;

}
