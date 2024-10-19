import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component'; // 确保引入了根组件

@NgModule({
  declarations: [
    AppComponent  // 确保根组件在这里声明
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]  // 确保这里有根组件
})
export class AppModule { }
