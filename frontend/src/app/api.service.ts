import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7032/api/Stream/numbers'; // 你的 .NET API 的基础URL

  constructor() { }

  // SSE
  getNumbersStream(): Observable<string> {
    return new Observable<string>(observer => {
      const eventSource = new EventSource(this.apiUrl);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data); // 解析接收到的数据
        observer.next(data); // 将数字传递给观察者
      };

      eventSource.onerror = (error) => {
        observer.complete(); // 关闭连接
        eventSource.close(); // 关闭 EventSource
      };

      return () => {
        eventSource.close(); // 组件卸载时关闭连接
      };
    });
  }





}
