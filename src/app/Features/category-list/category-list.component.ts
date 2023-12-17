import { GetAllCategory } from 'src/app/Interfaces/get-all-category.interface';
import { CategoryService } from './../Services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CategoryListComponent implements OnInit {

  categoryList?: GetAllCategory[];
  @ViewChild('table') table: any;
  visible: boolean = false;
  categoryId: number = 0;
  editModalVisible = false;
  subscription: Subscription | undefined;

  constructor(private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.GetCategoryList();
  }

  GetCategoryList(): void {
    this.categoryService.GetAllCategory()
      .subscribe({
        next: (success) => {
          this.categoryList = success;
          console.log(success);
        },
        error: (errMsg) => {
          console.log(errMsg);
        }
      });
  }

  onDelete(CategoryId: number) {
    this.categoryId = CategoryId;
    this.confirmationService.confirm(
      {
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.categoryService.DeleteCategory(this.categoryId)
            .subscribe(
              (Success) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Record deleted successfully.'
                });
                this.GetCategoryList();
              },
              (error) => { console.log(error); }
            )
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Cancelled',
            detail: 'Deletion Rejected'
          });
        }
      }
    )
  }
  showDialog() {
    this.visible = true;
  }

}
