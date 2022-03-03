function moveStar(arr: Array<string>): void {
    let start = arr.findIndex(item => item !== '*');
    let end = arr.lastIndexOf('*');
    const move = () => {
        arr.splice(end, 1);
        arr.unshift('*');
        start++;
        end = arr.lastIndexOf('*');
    }
    while (end > start) {
        console.log('---');
        move()
    }
}

const arr = ['*', '*', '1', '2', '*', '4', '*', '*', '7', '3'];

moveStar(arr);
console.log(arr); // ['*', '*', '*', '*', '*', '1', '2', '4',  '7', '3']

export {}
