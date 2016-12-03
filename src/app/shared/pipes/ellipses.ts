import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ellipses'
})

export class Ellipses implements PipeTransform{
    transform(value: string, maxLength: number): string {
        if(value.length <= maxLength)
            return value;
        else
           return value.substring(0,maxLength) + "...";
        /*let exp = parseFloat(exponent);
        return Math.pow(value, isNaN(exp) ? 1 : exp);*/
        //return "";
    }
}
