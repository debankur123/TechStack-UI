import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './Core/Components/navbar/navbar.component';
import {CategoryListComponent} from './Features/category-list/category-list.component';
import {AddCategoryComponent} from './Features/add-category/add-category.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EditCategoryComponent} from './Features/edit-category/edit-category.component';

// PrimeNg imports
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenubarModule} from 'primeng/menubar';
import {RouterModule} from '@angular/router';
import {BlogpostListComponent} from './Features/blog-post/blogpost-list/blogpost-list.component';
import {AddBlogpostComponent} from './Features/blog-post/add-blogpost/add-blogpost.component';
import {CalendarModule} from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxEditorModule } from 'ngx-editor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MarkdownModule } from 'ngx-markdown';
import { BadgeModule } from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditBlogpostComponent } from './Features/blog-post/edit-blogpost/edit-blogpost.component';
import { HighlightService } from './Features/Services/highlight.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

   


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MenubarModule,
    CalendarModule,
    InputSwitchModule,
    CheckboxModule,
    InputTextareaModule,
    NgxEditorModule,
    ProgressSpinnerModule,
    BadgeModule,
    MultiSelectModule,
    FormsModule,
    EditorModule,
    MarkdownModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
  ],
  providers: [MessageService,HighlightService,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
