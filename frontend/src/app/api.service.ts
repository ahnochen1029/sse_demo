import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7032/api/Stream/numbers'; // 你的 .NET API 的基础URL

  constructor(private http: HttpClient) { }

  // // SSE
  // getNumbersStream(): Observable<string> {
  //   return new Observable<string>(observer => {
  //     const eventSource = new EventSource(this.apiUrl);

  //     eventSource.onmessage = (event) => {
  //       const data = JSON.parse(event.data); // 解析接收到的数据
  //       observer.next(data); // 将数字传递给观察者
  //     };

  //     eventSource.onerror = (error) => {
  //       observer.complete(); // 关闭连接
  //       eventSource.close(); // 关闭 EventSource
  //     };

  //     return () => {
  //       eventSource.close(); // 组件卸载时关闭连接
  //     };
  //   });
  // }

  getNumbersStream(): Observable<any> {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl, true);

      xhr.onreadystatechange = () => {

        const text = xhr.responseText;

        // 将响应文本逐行解析
        const lines = text.split('\n');

        console.log('lines', lines);
        for (const line of lines) {
          if (line.trim()) {
            try {
              const json = JSON.parse(line);
              console.log('json', json);
              observer.next(json); // 推送解析后的 JSON 数据
            } catch (e) {
              // 忽略解析错误，继续处理下一个
            }
          }
        }

        if (xhr.readyState === XMLHttpRequest.DONE) {
          observer.complete(); // 响应结束，完成
        }

      };

      xhr.onerror = (error) => observer.error(error);
      xhr.send();

      return () => {
        xhr.abort(); // 清理操作，取消请求
      };
    });
  }



}
