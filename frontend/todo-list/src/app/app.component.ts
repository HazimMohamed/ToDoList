import { Component } from '@angular/core';
import { Item, ItemsService } from '../services/items.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Item[] = [];
  selectedItems: string[] = []
  stagingItem: Item | undefined = undefined;

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.itemsService.getAllItems()
        .then(items => this.items = items);
  }

  onItemSelect(id: string) {
    this.selectedItems.push(id);
  }

  deleteAllSelectedItems() {
    console.log(`Trying to delete ${this.selectedItems}`);
    this.itemsService.deleteItems(this.selectedItems).then((items) => {
      this.items = items;
    });
  }

  addToSelected(id: string) {
    this.selectedItems.push(id);
  }

  removeFromSelected(id: string) {
    this.selectedItems = this.selectedItems.filter(value => value != id);
  }

  createStagingItem() {
    this.stagingItem = new Item('', new Date(Date.now()));
  }

  submitStagedItem(item: Item) {
    if (this.stagingItem?.content != undefined) {
      this.itemsService.addItem(item.content).then((items) => {
        this.stagingItem = undefined;
        this.items = items;
      });
    }
  }
}
