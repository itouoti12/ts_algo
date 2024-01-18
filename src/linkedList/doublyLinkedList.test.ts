

class DoublyCell {
    data: any;

    prevNode?:DoublyCell;

    nextNode?: DoublyCell;

    constructor(data:any, next_node?:DoublyCell, prev_node?:DoublyCell){
        this.data = data;
        this.prevNode = prev_node;
        this.nextNode = next_node;
    }
}

class DoublyLinkedList {

    head?:DoublyCell;

    constructor(head?:DoublyCell){
        this.head = head;
    }

    append(data:any){
        const newDoublyCell = new DoublyCell(data);
        if(!this.head){
            this.head = newDoublyCell;
            return;
        }

        let lastCell = this.head;
        while (lastCell.nextNode) {
            lastCell = lastCell.nextNode
        }

        lastCell.nextNode = newDoublyCell;
        newDoublyCell.prevNode = lastCell;
    }

    insert(data:any){
        const newDoublyCell = new DoublyCell(data);
        if(this.head){
            this.head.prevNode = newDoublyCell;
        }
        newDoublyCell.nextNode = this.head;
        this.head = newDoublyCell;
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
        // 先頭
        if(current_node && current_node.data === data){
            current_node.prevNode = undefined;
            this.head = current_node.nextNode;
            current_node = undefined;
            return
        }

        // 中盤以降
        while (current_node && current_node.data !== data) {
            current_node = current_node.nextNode
        }

        if(!current_node)return;
        
        if(current_node.prevNode){
            current_node.prevNode.nextNode = current_node.nextNode;
        }
        if(current_node.nextNode){
            current_node.nextNode.prevNode = current_node.prevNode;
        }
    }
    
    reverse(){
        let current_node = this.head;
        let reverse_node = undefined;
        while (current_node) {
            reverse_node = current_node.prevNode;
            current_node.prevNode = current_node.nextNode;
            current_node.nextNode = reverse_node;
            current_node = current_node.prevNode;
        }
        if(reverse_node){
            this.head = reverse_node.prevNode;
        }
    }

    reverse_re(){
        function _reverse(current_node?:DoublyCell){
            if(current_node){
                let next_node = current_node.nextNode;
                current_node.nextNode = current_node.prevNode;
                current_node.prevNode = next_node;

                if(!current_node.prevNode){
                    return current_node 
                }

                return _reverse(next_node);
            }else{
                return undefined; 
            }
        }

        this.head = _reverse(this.head);
    }

    bubble_sort(){
        let current_node = this.head;
        while (current_node) {
            let target_node = current_node.nextNode;
            while (target_node) {
                if(current_node.data > target_node.data){
                    [current_node.data,target_node.data] = [target_node.data,current_node.data];
                }
                target_node = target_node.nextNode;
            }
            current_node = current_node.nextNode;
        }
    }
}

it.only('sort ', () => {
    const d = new DoublyLinkedList();
    d.append(1);
    d.append(5);
    d.append(2);
    d.append(9);
    d.print();

    console.log('####')
    d.bubble_sort();
    d.print();
    
});




it('should ', () => {
    const d = new DoublyLinkedList();
    d.append(1);
    d.append(2);
    d.append(3);
    d.insert(0);
    d.print();

    console.log('####')

    d.remove(3);
    d.print();

    console.log('####')

    d.reverse();
    d.print();

    console.log('####')

    d.reverse_re();
    d.print();

});