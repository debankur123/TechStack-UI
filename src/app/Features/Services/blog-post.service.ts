import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AddBlogModel} from "../../Interfaces/add-blog-post.interface";

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private baseAPIURL = environment.APIURL;

  constructor(private client: HttpClient) { }

  InsertUpdateBlogContent(body: AddBlogModel): Observable<any> {
    return this.client.post<any>(
      `${this.baseAPIURL}/api/BlogContent/InsertBlogPostWithContent`,
      body
    );
  }

  GetAllBlogPostList(): Observable<AddBlogModel> {
    return this.client.get<AddBlogModel>(`${this.baseAPIURL}/api/BlogContent/GetAllBlogPosts`);
  }
  GetBlogContentById(id : Number) : Observable<AddBlogModel>{
    return this.client.get<AddBlogModel>(`${this.baseAPIURL}/api/BlogContent/GetBlogContentbyId/?Id=${id}`);
  }
  DeleteBlogContent(Id: Number): Observable<any> {
    return this.client.patch<Number>(
      `${this.baseAPIURL}/api/BlogContent/DeleteBlogContent/?Id=${Id}`,
      null
    );
  }
  
}
