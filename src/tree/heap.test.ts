import { sys } from "typescript";


class MiniHeap {

    heap:any[];
    currentSize:number;

    constructor() {
        this.heap = [-1 * Number.MAX_SAFE_INTEGER];
        this.currentSize = 0;
    }

    parentIndex(index:number):number {
        return Math.floor(index / 2);
    }

    leftChildIndex(index:number):number{
        return index * 2;
    }

    rightChildIndex(index:number):number{
        return (index * 2) + 1;
    }

    swap(index1:number, index2:number){
        [this.heap[index1],this.heap[index2]] = [this.heap[index2],this.heap[index1]];
    }

    heapfyUp(index:number){
        let targetIndex = index;
        while (this.parentIndex(targetIndex) > 0) {
            if(this.heap[targetIndex] < this.heap[this.parentIndex(targetIndex)]){
                this.swap(targetIndex,this.parentIndex(targetIndex));
            }
            targetIndex = this.parentIndex(targetIndex);
        }
    }

    push(value:any){
        this.heap.push(value);
        this.currentSize ++;
        this.heapfyUp(this.currentSize);
    }

    miniChild(index:number):number{
        if(this.rightChildIndex(index) > this.currentSize){
            return this.leftChildIndex(index);
        }else{
            if(this.heap[this.leftChildIndex(index)] < this.heap[this.rightChildIndex(index)]){
                return this.leftChildIndex(index);
            }else{
                return this.rightChildIndex(index);
            }
        }
    }

    heapfyDown(index:number){
        let targetIndex = index;
        while (this.leftChildIndex(targetIndex) <= this.currentSize) {
            const miniChildIndex = this.miniChild(targetIndex);
            if(this.heap[targetIndex] > this.heap[miniChildIndex]){
                this.swap(targetIndex, miniChildIndex);
            }
            targetIndex = miniChildIndex;
        }
    }

    pop():any{
        if (this.heap.length === 1) return;

        const root = this.heap[1];

        const data = this.heap.pop();
        if(this.heap.length === 1) return root;

        this.heap[1] = data || 0;
        this.currentSize --;
        this.heapfyDown(1);
        return root;

    }
}


it('test heap ', () => {

    const miniHeap = new MiniHeap();
    miniHeap.push(5);
    miniHeap.push(6);
    miniHeap.push(2);
    miniHeap.push(9);
    miniHeap.push(13);
    miniHeap.push(11);
    miniHeap.push(1);
    console.log(miniHeap.heap);
    console.log(miniHeap.pop());
    console.log(miniHeap.heap);
    console.log(miniHeap.pop());
    console.log(miniHeap.heap);
    
});



it('頻出文字順に出力する', () => {

    const miniHeap = new MiniHeap();
    miniHeap.push('python');
    miniHeap.push('c');
    miniHeap.push('java');
    miniHeap.push('go');
    miniHeap.push('python');
    miniHeap.push('c');
    miniHeap.push('go');
    miniHeap.push('python');
    console.log(miniHeap.heap);

    const result:{[key:string]:number} = {};

    let targetStr  = miniHeap.pop()
    while(targetStr){
        if(result[targetStr]){
            result[targetStr]++;
        }else{
            result[targetStr] = 1;
        }
        targetStr  = miniHeap.pop()
    }
    console.log(result);

    // NOTE: 上位３つの頻出単語を取り出す
    const resulttoList = Object.keys(result).map((key)=> [result[key],key]);

    for (let i = 0; i < resulttoList.length; i++) {
        for (let j = i+1; j < resulttoList.length; j++) {
            if(resulttoList[i][0] < resulttoList[j][0] ){
                [resulttoList[i], resulttoList[j]] = [resulttoList[j], resulttoList[i]];
            }
        }
    }
    console.log(resulttoList);

    let answer:(string|number)[] = []
    for (let i = 0; i < 3; i++) {
        const val = resulttoList[i][1];
        answer.push(val);
    }

    console.log(answer);
});
