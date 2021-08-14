import { ElementRef } from '@angular/core';

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

  static toast(message: string): void {
    M.toast({html: message})
  }

  static initFloatButton(elementRef: ElementRef): void {
    M.FloatingActionButton.init(elementRef.nativeElement)
  }

  static updateTextFields(): void {
    M.updateTextFields()
  }

  static initModal(modalRef: ElementRef): MaterializeInstance {
    return M.Modal.init(modalRef.nativeElement)
  }

  static initSelect(selectRef: ElementRef): MaterializeInstance {
    return M.FormSelect.init(selectRef.nativeElement)
  }

  static initAutocomplete(autocomplete: ElementRef, options: object): MaterializeInstance {
    return M.Autocomplete.init(autocomplete.nativeElement, options)
  }

  static initTooltip(modalRef: ElementRef): MaterializeInstance {
    return M.Tooltip.init(modalRef.nativeElement)
  }

  static iniDatepicker(ref: ElementRef, onClose: () => void): MaterializeDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearButton: true,
      i18n: {
        months: [
          'Февраль',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Август',
          'September',
          'October',
          'November',
          'December'
        ]
      },
      onClose
    })
  }

  static iniTapTarget(ref: ElementRef): MaterializeInstance {
    return M.TapTarget.init(ref.nativeElement)
  }

  static initSidenav(ref: ElementRef): MaterializeInstance {
    return M.Sidenav.init(ref.nativeElement)
  }
}
