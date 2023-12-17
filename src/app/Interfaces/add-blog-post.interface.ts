export interface AddBlogModel {
  blogModule: {
    id: number;
    title: string;
    shortDescription: string;
    featuredImageURL: string;
    urlHandle: string;
    publishedDate: Date;
    author: string;
    isVisible: boolean;
    // createdBy: number;
    // createdDate: Date;
  };
  content: ContentModel[];
  categoryIds: Number[];
}

export interface ContentModel {
  id: number;
  blogPostId: number;
  content: string;
  // createdBy: number;
  // createdDate: Date;
  // modifiedBy: number | null;
  // modifiedDate: Date | null;
}
