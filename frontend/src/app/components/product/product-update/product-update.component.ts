import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(
    private productSevice: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id')
    this.productSevice.readById(id).subscribe(product => {
      this.product = product
    })
  }

  updateProduct(): void {
    this.productSevice.update(this.product).subscribe(() => {
      this.productSevice.showMessage('Product was updated!')
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }

}
