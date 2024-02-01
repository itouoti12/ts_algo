

class Queue {

    queue:any[]

    constructor() {
        this.queue = [];
    }

    enQueue(data:any){
        this.queue.push(data);
    }

    deQueue(){
        return this.queue.shift();
    }

    reverse(){
        // 非破壊的
        // return this.queue.reverse();

        // 破壊的
        const new_queue:any[] =[];
        for (let i = this.queue.length - 1; i >= 0; i--) {
            new_queue.push(this.queue[i]);
        }
        this.queue = new_queue;
    }

    answer(){
        const new_queue:any[] =[];
        while (this.queue.length !== 0) {
            new_queue.push(this.queue.pop());
        }
        this.queue = new_queue;
    }

}

it('test queue ', () => {
    const q = new Queue()

    q.enQueue(1);
    q.enQueue(2);
    q.enQueue(3);
    q.enQueue(4);
    console.log(q.queue)

    q.reverse();
    console.log(q.queue)

    q.answer();
    console.log(q.queue)
});
