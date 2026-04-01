export interface LinkDto {
  id: number;
  title: string;
  url: string;
  isactive: boolean;
}

export interface PreviewDataDto {
  pictureUrl: string;
  username: string;
  description: string;
  links: LinkDto[];
}

export interface CreateLinkResponseDto {
  id: number;
  userId: number;
  title: string;
  url: string;
  iconType: string;
  position: number;
  isActive: boolean;
}

export interface CreateLinkRequestDto {
  title: string;
  url: string;
  isActive: boolean;
}

export interface UpdateLinkResponseDto {
  id: number;
  userId: number;
  title: string;
  url: string;
  iconType: string;
  position: number;
  isActive: boolean;
}

export interface UpdateLinkRequestDto {
  title?: string;
  url?: string;
  position?: number;
  isActive?: boolean;
}
