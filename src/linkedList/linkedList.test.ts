

class Cell {

    data:any;

    nextNode?:Cell;

    constructor(data:any, next_node?:Cell) {
        this.data = data;
        this.nextNode = next_node
    }
}

class LinkedList {

    head?:Cell;

    constructor(head?:Cell) {
        this.head = head;
    }

    append(data:any) {
        const newCell = new Cell(data);
        if(!this.head){
            this.head = newCell;
            return;
        }

        let lastCell = this.head;
        while (!!lastCell.nextNode) {
            lastCell = lastCell.nextNode;
        }
        lastCell.nextNode = newCell;
    }

    insert(data:any){
        const newCell = new Cell(data);
        newCell.nextNode = this.head;
        this.head = newCell;
    }

    print(){
        let current_node = this.head;
        while (current_node) {
            console.log(current_node.data);
            current_node = current_node.nextNode;
        }
    }

    remove(data:any){
        let current_node = this.head;
        // 先頭の場合
        if(current_node && current_node.data === data){
            this.head = current_node.nextNode;
            current_node = undefined;
            return;
        }

        let previous_node = undefined;
        while (current_node && current_node.data !== data) {
            previous_node = current_node;
            current_node = current_node.nextNode;
        }

        if(!current_node || !previous_node){
            return;
        }

        previous_node.nextNode = current_node.nextNode;
        current_node = undefined;

    }

    reverse(){
        let current_node = this.head;
        let reverse_node = undefined;
        while (current_node) {
            let next_node = current_node?.nextNode
            current_node.nextNode = reverse_node;
            reverse_node = current_node;
            current_node = next_node;
        }

        this.head = reverse_node 
        return this;
    }

    reverse_re(){
        function _reverse(current_node?:Cell, reverse_node?:Cell){
            if(current_node){
                let next_node = current_node.nextNode;
                current_node.nextNode = reverse_node;
                _reverse(next_node,current_node);
            }else{
                return reverse_node;
            }
        }
        this.head  = _reverse(this.head, undefined);
        return this;
    }

    reverse_even(){

        let current_node = this.head;
        while (current_node?.nextNode) {
            // 次のnodeが偶数なのでreverse対象
            if(current_node.nextNode.data % 2 === 0){

                let first_node = current_node.nextNode;
                let even_node = current_node.nextNode;
                let reverse_node = undefined; // NOTE: あとで9をつける必要がある
                let last_node = even_node.nextNode;

                while (even_node.nextNode && even_node.nextNode.data %2 === 0) {
                    let even_next_node = even_node.nextNode;
                    last_node = even_next_node.nextNode;
                    even_node.nextNode = reverse_node;
                    reverse_node = even_node;
                    even_node = even_next_node;
                }
                if(even_node) even_node.nextNode = reverse_node;
                
                first_node.nextNode = last_node;
                current_node.nextNode = even_node;
                current_node = last_node;

            }else{
                // 奇数なのでそのまま
                current_node = current_node.nextNode;
            }
        }
    }

    reverse_even_answer(){
        function _reverse_even(head?:Cell, previous_node?:Cell){
            if(!head)return undefined;

            let current_node:Cell|undefined = head;
            while (current_node && current_node.data % 2 === 0) {
                const next_node:Cell|undefined = current_node.nextNode;
                current_node.nextNode = previous_node;
                previous_node = current_node;
                current_node = next_node;
            }

            if(current_node !== head){
                head.nextNode = current_node;
                _reverse_even(current_node, undefined);
                return previous_node;
            }else{
                head.nextNode = _reverse_even(head.nextNode, head);;
                return head;
            }
        }
        this.head = _reverse_even(this.head, undefined);

    }

    result(){
        const result_array:any[] = [];
        let current_node = this.head;
        while (current_node) {
            result_array.push(current_node.data);
            current_node  = current_node.nextNode;
        }
        return result_array;
    }
}
it.each`
    input |  result 
    ${[1,3,5 ]}| ${[1,3,5]}
    ${[1,4,6,8,9]}| ${[1,8,6,4,9]}
    ${[1,4,6,8,9,1,4,6,8,9 ]}| ${[1,8,6,4,9,1,8,6,4,9]}
    ${[1,2,3,4,5,6 ]}| ${[1,2,3,4,5,6]}
`('偶数のものだけ並び替える $input ', ({input,result}) => {
    const l = new LinkedList();
    input.forEach((num:number)=>{
        l.append(num);
    })
    
    l.reverse_even()
    expect(l.result()).toEqual(result);
});
it.each`
    input |  result 
    ${[1,3,5 ]}| ${[1,3,5]}
    ${[1,4,6,8,9]}| ${[1,8,6,4,9]}
    ${[1,4,6,8,9,1,4,6,8,9 ]}| ${[1,8,6,4,9,1,8,6,4,9]}
    ${[1,2,3,4,5,6 ]}| ${[1,2,3,4,5,6]}
`('【回答】偶数のものだけ並び替える $input ', ({input,result}) => {
    const l = new LinkedList();
    input.forEach((num:number)=>{
        l.append(num);
    })
    
    l.reverse_even_answer()
    expect(l.result()).toEqual(result);
});

it('should ', () => {
    const l = new LinkedList();
    l.append(1);
    l.append(2);
    l.append(3);
    l.insert(0);
    l.print();
    console.log('#')

    l.remove(2);
    l.print();

    console.log('#')
    l.append(4);
    l.print();
    console.log('######')
    l.reverse().print();
    console.log('######')
    l.reverse_re().print();

});