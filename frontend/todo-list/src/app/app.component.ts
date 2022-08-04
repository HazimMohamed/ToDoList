import { Component } from '@angular/core';
import { Item, ItemsService } from '../services/items.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Item[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getAllItems().then(items => this.items = items);
  }
}
