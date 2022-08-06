import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Item } from '../../services/items.service';
import { formatDate } from '@angular/common'
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatFormFieldControl} from '@angular/material/form-field';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input()
  item?: Item;

  @Input()
  editable: boolean = false;

  @Output()
  checked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  unchecked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  saved: EventEmitter<Item> = new EventEmitter<Item>();

  hovered: boolean = false;

  stagedInput: string | undefined;

  getCreateTimeString(): string | undefined {
    if (this.item?.createTime) {
      return formatDate(new Date(this.item?.createTime), 'YYYY-MM-dd h:mm:ss', 'en-US', '+0500')
    }
    return undefined;
  }

  mouseEnter() {
    this.hovered = true;
  }

  mouseLeave() {
    this.hovered = false;
  }

  onCheckChange(change: MatCheckboxChange) {
    if (change.checked) {
      this.checked.emit(this.item?.id);
    } else {
      this.unchecked.emit(this.item?.id);
    }
  }

  submitEdit() {
    if (this.stagedInput != undefined) {
      this.saved.emit(new Item(this.stagedInput, new Date(Date.now())));
    }
  }
}
