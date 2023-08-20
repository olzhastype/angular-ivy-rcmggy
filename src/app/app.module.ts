import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChartViewComponent } from './components/chart-view/chart-view.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  providers: [],
  declarations: [AppComponent, ChartViewComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
