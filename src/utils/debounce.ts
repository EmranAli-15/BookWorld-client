let timer: any


export const debounce = (fn: Function) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        fn();
    }, 700);
}