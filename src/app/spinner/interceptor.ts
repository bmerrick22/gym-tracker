import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
 
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
 
    constructor(private loaderService: LoaderService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        this.loaderService.show();

        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.loaderService.hide();
                    }
                }, (error) => {
                    this.loaderService.hide();
                })
            );
    }
}

//tutorial followed by On The Code artice by Umut Esen