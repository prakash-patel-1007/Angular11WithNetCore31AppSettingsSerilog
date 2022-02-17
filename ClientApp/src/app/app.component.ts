import { Component } from '@angular/core';
import { ComponentService } from './services/component.service';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  headerVisible = false;

  constructor(
    private componentService: ComponentService,
  ) { 
    this.componentService.result$
    .subscribe(result => this.headerVisible = result);
  }
}
