import { ElementRef } from "@angular/core";

declare var M

export interface MaterializeInstance {
  open?(): void

  close?(): void

  destroy?(): void
}

export interface MaterializeDatepicker extends MaterializeInstance {
  date?: Date
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

  static iniDatepicker(ref: ElementRef, onClose: () => void): MaterializeDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearButton: true,
      onClose
    })
  }

  static iniTapTarget(ref: ElementRef): MaterializeInstance {
    return M.TapTarget.init(ref.nativeElement)
  }
}
