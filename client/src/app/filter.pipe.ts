import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(bids: any, search: string): any {
    if(!search){return bids}
    let filtered = []
    for (let bid of bids){
      if (bid.username.toLowerCase().includes(search.toLowerCase())|| bid.amount.toString().includes(search)){
        filtered.push(bid)
      }
    }
    return filtered
  }

}