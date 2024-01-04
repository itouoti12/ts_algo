

/**
 * shell sort ... 間隔を狭めながら大雑把にinsertionソートを繰り返していく
 * insertionソートのあまり整列されてないデータに対しては低速という短所を解消するための戦略
 */


import _ from "lodash";

it.each`
    input | output 
    ${[5,6,9,2,3]} | ${[2,3,5,6,9]}

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
    let gap = Math.floor(result.length/2);

    console.log('step0: ',result);
    while (gap > 0) {

        for (let i = 0; i < result.length - gap; i++) {
            if(result[i] > result[i+gap]){
                [result[i] , result[i+gap]] = [result[i+gap] , result[i]];
                console.log('step1: ',result);
                for (let j = i-gap; j >= 0; j = j - gap) {
                    if(result[j] > result[j+gap] ){
                        [result[j] , result[j+gap]] = [result[j+gap] , result[j]];
                        console.log('step2: ',result);
                    }
                }
            }
        }
        gap = Math.floor(gap / 2);
    }


    return result;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);
    let gap = Math.floor(result.length/2);

    while (gap > 0) {
        for (let i = gap; i < result.length; i++) {
            let tmp = result[i]; 
            let j = i;
            while (j >= gap && result[j-gap] > tmp) {
                result[j] = result[j-gap];
                j -= gap;
            }
            result[j] = tmp;
        }
        
        gap = Math.floor(gap / 2);
    }


    return result;
}
