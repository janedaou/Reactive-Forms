import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.productService.searchProducts(term))
      )
      .subscribe((data) => {
        this.products = data;
      });

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
