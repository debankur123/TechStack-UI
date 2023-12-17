import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { GetAllCategory } from 'src/app/Interfaces/get-all-category.interface';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { EditRequest } from 'src/app/Interfaces/edit-category-request';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [MessageService]
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  public categoryId!: number;
  categoryDetails: GetAllCategory
  displayEditDialog = false;
  ParamsSubscription?: Subscription
  EditCategorySubs? : Subscription
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.categoryDetails = {
      categoryId: 0,
      name: '',
      urlHandle: ''
    }
  }


  ngOnInit(): void {
    this.route.params
      .subscribe(
        val => {
          this.categoryId = val['id'];
          this.fetchUserDetails(this.categoryId);
        }
      )
  }
  fetchUserDetails(categoryId: number) {
    this.categoryService.GetCategoryById(this.categoryId)
      .subscribe({
        next: (res) => {
          this.categoryDetails = res;
          this.displayEditDialog = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onFormEdit(): void {
    const UpdateCategory : EditRequest = {
      Name : this.categoryDetails.name ?? '',
      URLHandle : this.categoryDetails.urlHandle ?? ''
    }
    if(this.categoryId){
      this.EditCategorySubs = this.categoryService.UpdateCategory(this.categoryId,UpdateCategory)
        .subscribe(
          (Success : any) => {
            this.messageService.add({
              severity: 'success',
              detail: 'Category updated successfully.'
            });
            setTimeout(() => {
              this.router.navigate(['/admin/categories']);
            }, 1000); 
          },
          (ErrorMsg : any) =>{console.log(ErrorMsg);}
        )
    }
  }

  onDialogHide() {
    this.router.navigateByUrl('/admin/categories');
    this.displayEditDialog = false;
  }

  ngOnDestroy(): void {
    this.ParamsSubscription?.unsubscribe();
    this.EditCategorySubs?.unsubscribe();
  }


}









