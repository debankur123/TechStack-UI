import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { BlogPostService } from '../../Services/blog-post.service';
import { AddBlogModel } from 'src/app/Interfaces/add-blog-post.interface';
import { HighlightService } from '../../Services/highlight.service';
import { GetAllCategory } from 'src/app/Interfaces/get-all-category.interface';
import { CategoryService } from '../../Services/category.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],
  providers: [MessageService,]
})
export class EditBlogpostComponent implements OnInit, OnDestroy, AfterViewChecked {
  public contentId!: Number;
  subscription?: Subscription;
  editSubs? : Subscription;
  displayEditDialog!: Boolean;
  displayDialog: boolean = true;
  FormData!: AddBlogModel;
  highlighted: boolean = false;
  categories$: Observable<GetAllCategory[]> | undefined;
  selectedCategories: GetAllCategory[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogContentService: BlogPostService,
    private highlightService: HighlightService,
    private categoryService: CategoryService,
    private messageService: MessageService,
  ) {
    this.FormData = {
      blogModule: {
        id: 0,
        title: '',
        shortDescription: '',
        featuredImageURL: '',
        urlHandle: '',
        publishedDate: new Date(),
        author: '',
        isVisible: true,
        // createdBy: 1
        // ,
        // createdDate: new Date(),
      },
      content: [
        {
          id: 0,
          blogPostId: 0,
          content: '',
          // createdBy: 0,
          // createdDate: new Date(),
          // modifiedBy: null,
          // modifiedDate: new Date(),
        },
      ],
      categoryIds: [],
    }
  }
  ngAfterViewChecked(): void {
    if (this.FormData && !this.highlighted) {
      if (this.FormData.content[0]?.content) {
        this.highlightService.highlightAll();
        this.highlighted = true;
      }
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.GetAllCategory();
    this.route.params
      .subscribe(
        params => {
          this.contentId = params['id'];
          this.fetchContentDetails(this.contentId);
        }
      )
    this.highlightService.highlightAll();
  }
  fetchContentDetails(contentId: Number) {
    this.blogContentService.GetBlogContentById(this.contentId)
      .subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            this.FormData = res[0];
            this.FormData.blogModule.publishedDate = new Date(this.FormData.blogModule.publishedDate!);
            this.categories$?.subscribe(categories => {
              this.selectedCategories = categories.filter(category =>
                this.FormData.categoryIds?.includes(category.categoryId)
              ) || [];
            });
            
          } else {
            this.messageService.add({ severity: 'error', detail: 'No content found!!' });
          }
        },
        error: (err) => { this.messageService.add({severity : 'error',detail : 'Some Error Occured while processing!'}) },
      });
  }

  onSubmit(): void {
    this.FormData.categoryIds = this.selectedCategories.map(category => category.categoryId);
    this.FormData.content[0].content = this.sanitizeContent(
      this.FormData.content[0].content
    );
    this.editSubs = this.blogContentService.InsertUpdateBlogContent(this.FormData)
      .subscribe({
        next : (res) =>{
          this.messageService.add({
            severity : 'success',
            detail : 'Content updated successfully!!'
          });
          setTimeout(() => {
            this.router.navigateByUrl('/admin/blogposts');
          }, 2000);
        },
        error : (errMsg) => {
          this.messageService.add({
            severity : 'error',
            detail : errMsg
          });
          setTimeout(() => {
            this.router.navigateByUrl('/admin/blogposts');
          }, 2000);
        }
      })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.editSubs?.unsubscribe();
  }
  onReset() {

  }
  onCancel(): void {
    this.router.navigate(['/admin/blogposts']);
  }
  onDialogHide(): void {
    this.router.navigate(['/admin/blogposts']);
  }
  sanitizeContent(htmlString: string): string {
    return htmlString.replace(/<[^>]*>/g, '');
  }

}
