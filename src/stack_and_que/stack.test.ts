
class Stack {

    stack:any[];

    constructor() {
        this.stack = [];
    }

    push(data:any){
        this.stack.push(data);
    }

    pop(){
        return this.stack.pop();
    }
}

function validate_format(charts:string):boolean{
    const validateStack = new Stack();

    for (const char of charts) {
        if(['{','(','['].indexOf(char) !== -1){
            validateStack.push(char);
        }
        if(['}',')',']'].indexOf(char) !== -1){
            if(validateStack.stack.length === 0) return false;

            switch (char) {
                case '}':
                    const bracket1 = validateStack.pop();
                    if(bracket1 !== '{'){
                        return false;
                    }
                    break;
                case ']':
                    const bracket2 = validateStack.pop();
                    if(bracket2 !== '['){
                        return false;
                    }
                    break;
                case ')':
                    const bracket3 = validateStack.pop();
                    if(bracket3 !== '('){
                        return false;
                    }
                    break;
            }
        }
    }
    return validateStack.stack.length === 0;
}

function answer(charts: string):boolean{
    const lookup:{[key:string]:string} = {'{':'}','[':']','(':')'};
    const stack:string[] = [];

    for (const char of charts) {
        if(Object.keys(lookup).find(key=>key===char)){
            stack.push(lookup[char]);
        }

        if(Object.values(lookup).find(val=>val === char)){
            if(stack.length === 0)return false;
            if(char !== stack.pop()) return false;
        }
    }
    return stack.length === 0;
}

it('test stack', () => {
    const stack = new Stack();

    console.log(stack.stack);
    stack.push(1);
    console.log(stack.stack);
    stack.push(2);
    console.log(stack.stack);
    console.log(stack.pop());
    console.log(stack.stack);
    console.log(stack.pop());
    console.log(stack.stack);
    
});


/**
 * ([)]...false
 * ()[]}...false
 * }()[]...false
 * 
 */
it.each`
    input | output 
    ${"{'key1': 'value1', 'key2':[1,2,3], 'key3': (1,2,3)}"} | ${true}
    ${"{'key1': ['value1', 'key2':[1,2,3], 'key3': (1,2,3)}"} | ${false}
    ${"{'key1': 'value1', 'key2':(1,2,3[, 'key3': )1,2,3]}"} | ${false}
    ${"{'key1': 'value1', 'key2':[1,2,3], 'key3': (1,2,3)}}"} | ${false}
    ${"]{'key1': 'value1', 'key2':[1,2,3], 'key3': (1,2,3)}"} | ${false}

`('test $input to $output', ({input,output}:{input:string,output:boolean}) => {
    // WHEN
    const actual = validate_format(input);
    // THEN
    expect(actual).toEqual(output);

    const answerAct= answer(input);
    expect(answerAct).toEqual(output);
});
