import Swal from "sweetalert2";

export interface AlertParams {
  title?: string;
  text?: string;
  buttonText?: string;
}

export class UtilAlert {

  private constructor() {
  }

  static success(params?: AlertParams): void {
    Swal.fire({
      title: params?.title || '🚀 Genial',
      text: params?.text || '',
      icon: 'success',
      confirmButtonText: params?.buttonText || 'Continuemos'
    }).then();
  }

  static error(params?: AlertParams): void {
    Swal.fire({
      title: params?.title || '😅 Ups... algo salió mal',
      text: params?.text || '',
      icon: 'error',
      confirmButtonText: params?.buttonText || 'Disculpanos'
    }).then();
  }

  static warning(params?: AlertParams): void {
    Swal.fire({
      title: params?.title || '🤔 Mmm...',
      text: params?.text || '',
      icon: 'warning',
      confirmButtonText: params?.buttonText || 'Revisa y vuelve a intentar'
    }).then();
  }

}
