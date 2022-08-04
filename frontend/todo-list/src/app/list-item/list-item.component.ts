import {Component, Input, OnInit} from '@angular/core';
import { Item } from '../../services/items.service';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  item?: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
