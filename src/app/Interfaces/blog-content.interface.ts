export interface ContentModel {
  BlogPostId   : number;
  Content      : string;
  CreatedBy    : number;
  CreatedDate  : Date;
  ModifiedBy   : number | null;
  ModifiedDate : Date | null;
}
