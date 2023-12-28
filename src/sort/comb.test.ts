
import _ from "lodash";

it.each`
    input | output 
    ${[2,9,1,8,7,3,5]} | ${[1,2,3,5,7,8,9]}
    ${[417,289,508,324,400,287,418,534,623,509,]} | ${[287,289,324,400,417,418,508,509,534,623]}

`('test $input', ({input,output}:{input:number[],output:number[]}) => {
    // WHEN
    const actual = algorithm(input);
    // THEN
    expect(actual).toEqual(output);

    const answerAct= answer(input);
    expect(answerAct).toEqual(output);
});

// @ts-ignore
function algorithm(input:number[]):number[]{
    const result = _.cloneDeep(input);
    const COMB_DEFINITION = 1.3;

    let gap = Math.floor(result.length/COMB_DEFINITION); 
    let swap = true;

    while (swap) {
        swap=false;

        console.log('combWidth',gap);
        for (let i = 0; i + gap < result.length ; i++) {
            if(result[i] > result[i+gap]){
                [result[i],result[i+gap]] = [result[i+gap],result[i]];
                swap=true;
            }
        }

        if(gap > 1){
            swap=true;
        }

        gap = Math.floor(gap/COMB_DEFINITION); 
        if(gap < 1){
            gap = 1;
        }
        console.log(result);
    }
    return result;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    let gap = result.length;
    let swap = true;

    // while,forが2つネストされているので
    // BigO -> n^2
    while (swap || gap !==1) {
        gap = Math.floor(gap/1.3);
        if(gap < 1){
            gap = 1;
        }

        swap = false;

        for (let i = 0; i < result.length - gap; i++) {
            if(result[i] > result[i+gap]){
                [result[i],result[i+gap]] = [result[i+gap],result[i]];
                swap=true;
            }
        }
    }


    return result;
}