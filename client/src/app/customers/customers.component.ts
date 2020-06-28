import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiRequestService } from '../api-request.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  items;
  error;

  constructor(
    private router: Router,
    private api: ApiRequestService
  ) { }

  ngOnInit(): void {
    this.onRefreshClick()
  }

  onAllItems(items) {

    this.items = items;
  }

  listSortedPropertyKeyValues(item) {
    var json = JSON.parse(item['properties']);
    const keys = Object.keys(json).sort((one, two) => (one > two ? 1 : -1)); 
    var result: Array<[String, String]> = []
    for (let key of keys) {
      result.push([key,String(json[key])])
    } 
    return result
  }

  onRefreshClick() {
    this.api.dispatchPostRequest("/api/customers", {}).then(
      res => {
        this.onAllItems(res['customers']);
      },
      msg => {
        this.error = JSON.stringify(msg)
      })
  }

  isEditModeEnabled = false

  onEditModeClick() {
    this.isEditModeEnabled = !this.isEditModeEnabled
  }

  onEditClick(item) {
    var id = item['id']
    this.router.navigate(['customers/edit/' + id])
  }

  onDeleteClick(item) {
    var id = item['id']
    if (confirm("Should delete " + item['name'] + " ?")) {
      this.api.dispatchPostRequest("/api/customers/delete/" + id, {}).then(
        res => {
          this.onRefreshClick()
        },
        msg => {
          this.error = JSON.stringify(msg)
        }
      )
    }
  }
  onAddItemImageClick(item) {
    const foreigh_key = item.id
    this.router.navigate(['files/add/', {foreignKey: item.id, isPublic: "true"}])
  }

  onAddNewItemClick() {
    this.router.navigate(['customers/new'])
  }

}
