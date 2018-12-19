import { Injectable } from '@angular/core';
import {Message} from '../models/message';
import {HttpClient} from '@angular/common/http';
import Any = jasmine.Any;
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Array<Message>;

  constructor(private http: HttpClient) {
    this.messages = new Array<Message>();
  }

  public buildMessages(resutats: Array<Any>): Array<Message>{
    if(resutats != null){
      for (const result of resutats){
        const message = new Message(result);
        this.messages.push(message);
      }
    }
    return this.messages;
  }

  public getMessages(): Observable<Array<Message>> {
    return new Observable<Array<Message>>((observer) => {
      this.http.get<Array<any>>('https://jsonplaceholder.typicode.com/posts').subscribe(
        (messages) => {
          this.messages = this.buildMessages(messages);
          observer.next(this.messages);
        },
        (error) => observer.error(error),
        () => observer.complete()
      );
    });
  }

  public  addMessage(message: Message): Observable<Array<Message>> {
    console.log(message);
    this.messages.push(message);
    return of(this.messages);
  }
}
