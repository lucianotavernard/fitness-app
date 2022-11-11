import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return Array.isArray(value) ? value.join(', ') : value;
  }
}
