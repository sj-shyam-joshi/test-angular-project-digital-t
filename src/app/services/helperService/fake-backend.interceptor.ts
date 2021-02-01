import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(delay(500)) // add delay for make user feel like a real backend

    function handleRoute() {
      switch (true) {
        case url.includes('/api/bookSlot') && method === 'POST':
          return bookSlot(body);
        case url.includes('/api/updateSlot') && method === 'POST':
          return updateSlot(body);
          case url.includes('/api/getBookedSlots') && method === 'GET':
          return getBookedSlots();
          case url.includes('/api/getSlotById') && method === 'GET':
          return getSlotById();
        default:
          return next.handle(request);
      }
    }

    function getBookedSlots(){
      return success(bookedSlots);
    }

    function getSlotById(){
      let splittedUrl = url.split("/");
      let slotId = splittedUrl[splittedUrl.length - 1]
      let slot = bookedSlots.find(item => item.slotId == slotId)
      return success(slot);
    }

    function bookSlot(requestBody) {
      bookedSlots.push(requestBody);
      localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
      return success();
    }

    function updateSlot(requestBody){
      let targetSlot = bookedSlots.find(item => item.slotId == requestBody.slotId);
      targetSlot.firstName = requestBody.firstName;
      targetSlot.lastName = requestBody.lastName;
      targetSlot.email = requestBody.email;
      localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
      return success();
    }
   
    function success(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

  }
}


