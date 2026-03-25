export interface GenericResponseDto<T> {
  result: boolean;
  data: T;
  timestamp: string;
}
