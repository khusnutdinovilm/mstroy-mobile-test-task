export type FileDataValidator<T> = (item: unknown) => item is T;
export type OnSuccessHandler<T> = (fileName: string, data: T[]) => void | Promise<void>;

export interface ValidateParsedPayload<T> {
  data: unknown;
  validator: FileDataValidator<T>;
  errorMessage: string;
}

export interface IUseWebFileUploadPayload<T> {
  onSuccess: OnSuccessHandler<T>;
  fileDataValidator: FileDataValidator<T>;
}
