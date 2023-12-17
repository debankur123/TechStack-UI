export interface GetBlogContent {
    blogPostId : Number;
    categoryId : Number;
    categoryName : string;
    bLogTitle : string;
    shortBlogDescription : string;
    imageURL  :string;
    urlHandle : string;
    dateOfPublish : Date;
    blogAuthor : string;
    blogVisibleOrNot : Boolean;
    contentId : Number;
    blogContent : string;
    createdById : Number
}
