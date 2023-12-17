import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../Services/blog-post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
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
  constructor
    (
      private blogService: BlogPostService
    ) { this.subscription = new Subscription(); }

  ngOnInit(): void {
    this.subscription.add(
      this.blogService.GetAllBlogPostList()
        .subscribe(
          (response : any) => {
            this.blogList = response;
            console.log(this.blogList);
          },
          (errorMsg) =>{console.log(errorMsg)}
        )
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}





