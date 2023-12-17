import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from '../../Services/blog-post.service';
import { AddBlogModel } from '../../../Interfaces/add-blog-post.interface';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { GetAllCategory } from 'src/app/Interfaces/get-all-category.interface';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
  providers: [MessageService],
})
export class  AddBlogpostComponent implements OnInit, OnDestroy {
  FormData: AddBlogModel = {
    blogModule: {
      id: 0,
      title: '',
      shortDescription: '',
      featuredImageURL: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true
      // createdBy: 1,
      // createdDate: new Date(),
    },
    content: [
      {
        id: 0,
        blogPostId: 0,
        content: '',
        //createdBy: 0,
        //createdDate: new Date(),
        //modifiedBy: null,
        //modifiedDate: new Date(),
      },
    ],
    categoryIds: [],
  };
  isVisible: boolean = false;
  categories$: Observable<GetAllCategory[]> | undefined;
  selectedCategories: GetAllCategory[] = [];
  displayDialog: boolean = true;
  text: string | undefined;
  //editor!: Editor;
  subscription: Subscription;

  constructor(
    private route: Router,
    private service: BlogPostService,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.categories$ = this.categoryService.GetAllCategory();
  }

  ngOnDestroy(): void {
    //this.editor.destroy();
  }

  onSubmit(): void {
    this.FormData.categoryIds = this.selectedCategories.map(category => category.categoryId);
    this.FormData.content[0].content = this.sanitizeContent(
      this.FormData.content[0].content
    );
    //this.FormData.content[0].modifiedBy = 0;
    this.service.InsertUpdateBlogContent(this.FormData).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Content added successfully!!',
        });
        setTimeout(() => {
          this.route.navigateByUrl('/admin/blogposts');
        }, 2000);
      },
      error: (errMsg) => {
        this.messageService.add({
          severity : 'error',
          detail : errMsg
        });
      },
    });
  }

  onReset(){
    
  }

  onCancel(): void {
    this.route.navigate(['/admin/blogposts']);
  }

  onDialogHide(): void {
    this.route.navigate(['/admin/blogposts']);
  }

  sanitizeContent(htmlString: string): string {
    return htmlString.replace(/<[^>]*>/g, '');
  }
}
