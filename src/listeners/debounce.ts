export function debounce(fn: Function, delay: number) {
    let timer: NodeJS.Timeout | undefined;

    return function () {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}