import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiRequestService } from '../api-request.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  error;

  constructor(
    private router: Router,
    private api: ApiRequestService
  ) { }

  ngOnInit(): void {
  }

  onAllProducts(products) {

    this.products = products;
  }

  listSortedPropertyKeyValues(product) {
    var json = JSON.parse(product['properties']);
    const keys = Object.keys(json).sort((one, two) => (one > two ? 1 : -1)); 
    var result: Array<String> = []
    for (let key of keys) {
      result.push(key+ ":"+ String(json[key]))
    } 
    return result
  }

  onRefreshClick() {
    this.api.dispatchPostRequest("/api/products", {}).then(
      res => {
        this.onAllProducts(res['products']);
      },
      msg => {
        this.error = JSON.stringify(msg)
      })
  }

  onAddNewProductClick() {
    this.router.navigate(['products/add-new-product'])
  }
}
