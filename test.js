
function romanToInt(s) {
    const stringToArr = s.split('');
    const numArr = []
    for(let i = 0; i< stringToArr.length; i++){
        switch(stringToArr[i]){
            case 'I':
                numArr.push(1);
                break;
            case 'V':
                numArr.push(5);
                break;
            case 'IV':
                numArr.push(4);
                break;
            case 'X':
                numArr.push(10);
                break;
            case 'IX':
                numArr.push(9);
                break;
            case 'L':
                numArr.push(50);
                break;
            case 'XL':
                numArr.push(40);
                break;
            case 'C':
                numArr.push(100);
                break;
            case 'XC':
                numArr.push(900);
                break;
            case 'D':
                numArr.push(500);
                break;
            case 'CD':
                numArr.push(400);
                break;
            case 'M':
                numArr.push(1000);
                break;
            case 'CM':
                numArr.push(900);
                break;
            default: 
                return
        }
    }

    const number = numArr.reduce((acc,i) => {
        let sum;
        sum = acc + i;
        return sum
    }, 0)
    

    return  number;
    
};

console.log(romanToInt('III'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('MCMXCIV'));
