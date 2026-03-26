export interface LinkDto {
  id: number;
  title: string;
  url: string;
  isactive: boolean;
}

export interface PreviewDataDto{
  pictureUrl: string;
  username: string;
  description: string;
  links: LinkDto[]
}
