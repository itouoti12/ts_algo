/**
 * counting sort ... BigO = nのため高速なアルゴリズムであるが、要素の中の最大数の数の配列を用意しなけれなならないので、メモリの消費が激しい
 */


import _ from "lodash";

it.each`
    input | output 
    ${[4,3,6,2,3,4,7]} | ${[2,3,3,4,4,6,7]}

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

    // 配列を用意する
    const maxNum = Math.max(...result);
    const countBox = [...Array(maxNum)].map(()=>0);

    // 値の存在する数を各配列でカウントアップする
    result.forEach(num=>{
        countBox[num-1]++;
    });
    console.log(countBox)

    // 配列の中のカウントを、前の数字までの合計数に変換する
    for (let i = 0; i < countBox.length-1; i++) {
        countBox[i+1] = countBox[i] + countBox[i+1];
    }
    console.log(countBox)

    // 数字を出現する順番に振り分けていく
    const actual = [...Array(maxNum)].map(()=>0);
    result.reverse().forEach(num=>{
        const idx = countBox[num-1];
        actual[idx-1] = num;
        countBox[num-1]--;
    });

    return actual;
}
// @ts-ignore
function answer(input:number[]):number[]{
    const result = _.cloneDeep(input);

    const maxNum = Math.max(...result);
    const counts = [...Array(maxNum + 1)].map(()=>0);
    const actual = [...Array(maxNum)].map(()=>0);

    result.forEach((num)=>{
        counts[num]++;
    })

    for (let i = 1; i < counts.length; i++) {
        counts[i] += counts[i-1];
    }

    let j = result.length - 1;
    while (j >= 0) {
        const idx = result[j];
        actual[counts[idx] - 1] = result[j];
        counts[idx]--;
        j--;
    }

    return actual;
}
