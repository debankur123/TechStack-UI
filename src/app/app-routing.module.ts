import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from './Features/category-list/category-list.component';
import {AddCategoryComponent} from './Features/add-category/add-category.component';
import {EditCategoryComponent} from './Features/edit-category/edit-category.component';
import {BlogpostListComponent} from "./Features/blog-post/blogpost-list/blogpost-list.component";
import {AddBlogpostComponent} from "./Features/blog-post/add-blogpost/add-blogpost.component";
import { EditBlogpostComponent } from './Features/blog-post/edit-blogpost/edit-blogpost.component';

const routes: Routes = [
  {
    path: 'admin/categories',
    component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent
  },
  {
    path : 'admin/blogposts/:id',
    component : EditBlogpostComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
