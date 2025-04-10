// class Car {
    
//     constructor(cor, ano) {   
//         this.cor = cor;
//         this.ano = ano
//     }

//     andar() {
//         console.log(`A cor do carro é ${this.cor} e o ano é ${this.ano}`);
//     }
// }

// new Car('Preto', 2012).andar();
// import fns from'date-fns';
import { addDays, format } from 'date-fns';

const dateNow = new Date();
const dateNew = addDays(dateNow, 7);

console.log(dateNew);
console.log(format(dateNow, "dd/MM/yyyy"));
