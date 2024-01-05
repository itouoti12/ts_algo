
import _ from "lodash";

it.each`
    input | output 
    ${[24,10,11,324,201,101,55]} | ${[10,11,24,55,101,201,324]}

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
    const maxNum = Math.max(...result);

    // 最大数の桁数を求める
    const radix = String(maxNum).length;
    // 配列を3桁固定の文字列に変える
    let resultToStr = result.map((num)=>{
        if(String(num).length === radix){
            return String(num);
        }else{
            let re = '';
            for (let i = 0; i < radix - String(num).length; i++) {
                re = re + '_';
            }
            re = re+String(num);
            return re;
        }
    });
    console.log(resultToStr);


    // 桁数分ソートを繰り返す
    for (let i = radix-1; i >= 0; i--) {
        const radixArray = resultToStr.map((numStr)=>isNaN(Number(numStr[i]))?0:Number(numStr[i]));
        
        // counting ソート
        const counts = [...Array(Math.max(...radixArray) + 1)].map(()=>0);
        const actual = [...Array(resultToStr.length)].map(()=>'');
        radixArray.forEach(num=>{
            counts[num]++;
        });
        console.log(counts);

        for (let j = 1; j < counts.length; j++) {
            counts[j] += counts[j-1];
        }
        console.log(counts);

        let k = resultToStr.length-1;
        while (k >= 0) {
            const idx = counts[radixArray[k]];
            actual[idx-1] = resultToStr[k];
            counts[radixArray[k]]--;
            k--;
        }

        console.log(actual)
        resultToStr = actual;
    }

     const orderActual = resultToStr.map(numStr=>numStr.replace('_',''));
     return orderActual.map(numStr=>Number(numStr));
}
// @ts-ignore
function answer(input:number[]):number[]{
    let result = _.cloneDeep(input);


    const maxNum = Math.max(...result);
    let place = 1;
    // NOTE: ネストしているので一見BigO=n^2に見えるが、配列数が増えてもcounting sortの計算数は指数関数的に増えはセず、比例するのでBigO=nとなる
    while (maxNum > place) {

        // counting sort
        // NOTE: 位ベースでいうと0~9しか入らないため、最大要素数は10に収まる
        const counts = [...Array(10)].map(()=>0);
        const actual = [...Array(result.length)];

        result.forEach(num=>{
            // NOTE: 桁数で数字を割った数の10の余りで10以内に収まったindexが出せる
            const index = Math.floor(num/place) % 10;
            counts[index]++;
        });
        for (let i = 1; i < 10; i++) {
            counts[i] += counts[i-1];
        }
        let j = result.length - 1;
        while (j >= 0) {
            const index = Math.floor(result[j]/place) % 10;
            actual[counts[index]-1] = result[j];
            counts[index]--;
            j--;
        }

        result = actual;
        // 位をずらしていく
        place *= 10;
    }


    return result;
}
