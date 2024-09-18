import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";
  
@Injectable()
export class ResponseDTOInterceptor<T> implements NestInterceptor {
    constructor(private readonly classType: new (...args: any[]) => T) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => plainToInstance(this.classType, data)),
        );
    }
}