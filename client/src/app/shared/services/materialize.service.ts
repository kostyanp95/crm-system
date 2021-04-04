import { ElementRef } from "@angular/core";

declare var M

export interface MaterializeInstance {
  open?(): void

  close?(): void

  destroy?(): void
}

export class MaterializeService {

  static toast(message: string) {
    M.toast({html: message})
  }

  static initFloatButton(elementRef: ElementRef) {
    M.FloatingActionButton.init(elementRef.nativeElement)
  }

  static updateTextFields(): void {
    M.updateTextFields()
  }

  static initModal(modalRef: ElementRef): MaterializeInstance {
    return M.Modal.init(modalRef.nativeElement)
  }

  static initTooltip(modalRef: ElementRef): MaterializeInstance {
    return M.Tooltip.init(modalRef.nativeElement)
  }
}
