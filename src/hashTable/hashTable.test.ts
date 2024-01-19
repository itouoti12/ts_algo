import { MD5 } from "crypto-js";



class HashTable {

    size:number;

    table:string[][];

    constructor(size = 10) {
        this.size = size
        this.table = [...new Array(size)].map(()=>[] as string[]);
    }

    hash(key:string):number{
        const keyMd5 = MD5(key).toString();
        return parseInt(keyMd5,16) % this.size;
    }

    add(key:string,value:string){
        const index = this.hash(key);
        let isOverride = false;

        for (const data of this.table[index]) {
            if(data[0] === key){
                isOverride = true;
                // @ts-ignore
                data[1] = value;
                break;
            }
        }

        if(!isOverride){
            // @ts-ignore
            this.table[index].push([key,value]);
        }
    }

    get(key:string){
        const index = this.hash(key);
        for (const data of this.table[index]) {
            if(data[0] === key){
                return data[1];
            }
        }
        return '';
    }


}


it('should ', () => {
    const hash = new HashTable();
    console.log(hash);
    hash.hash('car');
});

it('should2 ', () => {
    const hash = new HashTable();
    hash.add('car','tesla');
    hash.add('car','toyota');
    hash.add('pc','Mac');
    hash.add('sns','Youtube');
    console.dir(hash,{depth: null});

    console.log(hash.get('car'));
    console.log(hash.get('sns'));
    console.log(hash.get('bbb'));
});


it('quiz1', () => {
    const input = [11,2,5,9,10,3];
    const input2 = 12;
    const output = [2,10];

    const dict:{[key:string]:number[]} = {}

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if(i !== j){
                const key = input[i]+input[j];
                if(!dict[key]){
                    dict[key] = [input[i],input[j]];
                }
            }
        }
    }

    expect(dict[input2]).toEqual(output);

    let actual:number[] = []
    const answer = new Set();
    for (const val of input) {
        const target = input2 - val;
        if(answer.has(target)){
            actual = [target,val];
            break;
        }
        answer.add(val);
    }

    expect(actual).toEqual(output);

});

it('quiz2 ', () => {
    const input = [11,2,5,9,10,3];
    const output = [11,9];


    const half_sum = input.reduce((a,b)=>a+b) / 2; 

    if(half_sum % 2 !== 0){
        return;
    }

    let actual:number[] = []
    const answer = new Set();

    for (const val of input) {
        const target = half_sum - val;
        if(answer.has(target)){
            actual = [target,val];
            break;
        }
        answer.add(val);
    }

    expect(actual).toEqual(output);

    
});