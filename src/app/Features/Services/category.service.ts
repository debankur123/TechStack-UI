
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from 'src/app/Interfaces/add-category-request.interface';
import { EditRequest } from 'src/app/Interfaces/edit-category-request';
import { GetAllCategory } from 'src/app/Interfaces/get-all-category.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseAPIURL = environment.APIURL
  updateCategory = {
    name : '',
    URLHandle : ''
  }

  constructor(
    private http: HttpClient
  ) { }

  Addcategory (model : AddCategoryRequest) : Observable<void>{
    return this.http.post<void>('https://localhost:44307/api/categories/AddCategories',model);
  }

  GetAllCategory() : Observable<GetAllCategory[]>{
    return this.http.get<GetAllCategory[]>('https://localhost:44307/api/categories/GetAllCategories');
  }

  GetCategoryById(categoryId: number): Observable<GetAllCategory> {
    return this.http.get<GetAllCategory>(`https://localhost:44307/api/Categories/GetCategoryById?id=${categoryId}`);
  }
  UpdateCategory(categoryId : number, editCategory : EditRequest) : Observable<AddCategoryRequest>{
    return this.http.post<AddCategoryRequest>(`${this.baseAPIURL}/api/Categories/UpdateCategories?id=${categoryId}`,editCategory)
  }
  DeleteCategory(categoryId : number) : Observable<any> {
    return this.http.post<any>(`${this.baseAPIURL}/api/Categories/DeleteCategories?id=${categoryId}`,null)
  }
}
