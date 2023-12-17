import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from 'src/app/Interfaces/add-category-request.interface';
import { CategoryService } from '../Services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers : [MessageService]
})
export class AddCategoryComponent implements OnDestroy{
  model: AddCategoryRequest 
  displayAddDialog = true;
  private addCategorySubscription?: Subscription
  constructor(
    private categoryService: CategoryService,
    private router : Router,
    private messageService: MessageService
  ) {
    this.model = {
      name: '',
      URLHandle: ''
    };
  }

  onFormSubmit() : void {
    this.displayAddDialog = true;
    this.addCategorySubscription = this.categoryService.Addcategory(this.model)
      .subscribe(
        (success) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Record added successfully.'
          });
          setTimeout(() => {
            this.router.navigate(['/admin/categories']);
          }, 1000); 
        },
        (errMsg) => {
          console.log(errMsg);
        }
      );
  }
  onDialogHide() {
    this.router.navigateByUrl('/admin/categories');
    this.displayAddDialog = false;
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
