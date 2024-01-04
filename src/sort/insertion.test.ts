
import _ from "lodash";
import { randRange } from "./___.test";

it.each`
    input | output 
    ${[1,7,3,2,8,5]} | ${[1,2,3,5,7,8]}

`('test $input', ({input,output}:{input:number[],output:number[]}) => {
    // WHEN
    const actual = algorithm(input,true);
    // THEN
    expect(actual).toEqual(output);

    const answerAct= answer(input);
    expect(answerAct).toEqual(output);
});

it.each`
    case
    ${1}
    ${2}
    ${3}
    ${4}
    ${5}
`('random test case:$case', () => {
    // GIVEN
    const input = [...Array(10)].map(()=>randRange(1,1000));
    console.log('input',input);
    // WHEN
    const actual = algorithm(input,false);
    // THEN
    console.log('actual',actual);
});

// @ts-ignore
function algorithm(input:number[],showLog:boolean):number[]{
    const result = _.cloneDeep(input);


    if(showLog)console.log(result);
    for (let i = 1; i < result.length; i++) {

        let tmp = 0;
        if(result[i-1]>result[i]){
            tmp = result[i];
            result[i] = result[i-1];

            for (let j = i; j >= 0; j--) {
                if(result[j-1]>tmp){
                    result[j] = result[j-1];
                }else{
                    result[j]=tmp;
                    break;
                }
            }
            if(showLog)console.log(result);
        }
    }

    return result;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    // while,forが2つネストされているので
    // BigO -> n^2
    for (let i = 1; i < result.length; i++) {
        let tmp = result[i];
        let j = i -1;
        while (j >= 0 && result[j] > tmp) {
            result[j+1] = result[j];
            j--;
        }
        result[j+1] = tmp;
    }

    return result;
}
