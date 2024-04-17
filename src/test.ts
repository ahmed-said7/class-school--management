function divide(dividend: number, divisor: number): number {
    let sum=0;
    let count=0;
    while( dividend >= sum ){
        sum += divisor;
        count++;
    };
    return dividend*divisor<0 ? -count : count;
};