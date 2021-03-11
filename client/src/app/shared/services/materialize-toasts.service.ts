declare var M

export class MaterializeToastsService {
  static toast(message: string) {
    M.toast({html: message})
  }
}
