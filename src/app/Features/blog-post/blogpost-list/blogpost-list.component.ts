import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../Services/blog-post.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
  providers: [MessageService],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BlogpostListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loading: boolean = true;
  blogList : any[] = [];
  Id : Number = 0;
  constructor
    (
      private blogService: BlogPostService,
    ) { this.subscription = new Subscription();
     }

  ngOnInit(): void {
    this.FetchAllBlogPosts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  FetchAllBlogPosts() : void{
    this.subscription.add(
      this.blogService.GetAllBlogPostList()
        .subscribe(
          (response : any) => {
            this.blogList = response;
            console.log(this.blogList);
          },
          (errorMsg : any) =>{console.log(errorMsg)}
        )
    )
  }

  OnDelete(blogId : Number){
    this.Id = blogId;
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to delete this blog post?',
      'Yes',
      'No',
      () => {
        this.blogService.DeleteBlogContent(this.Id)
          .subscribe({
            next : (response : any) =>{
              Notiflix.Notify.success(response.statusMsg);
              this.FetchAllBlogPosts();
            },
            error : (errMsg : any) => {
              Notiflix.Notify.failure(errMsg);
            }
          })
      },
      () => {
        console.log('Cancelled');
      }
    );
  
  }

}





