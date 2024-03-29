import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CategoriesService } from '../../../shared/services/categories.service';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterViewInit {

  @ViewChild('inputFile') uploadFileRef: ElementRef
  @ViewChild('largeFileWarning') largeFileWarningRef: ElementRef

  form: FormGroup
  isNew = true
  category: Category
  categoryImage: File
  categoryImagePreview: string | ArrayBuffer | null
  largeFileWarning: MaterializeInstance

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.route.params
    //   .subscribe((params: Params) => {
    //     if (params['id']) {
    //       // Edit form
    //       this.isNew = false
    //     } else {
    //       // Create form
    //     }
    //   })

    this.formInit()

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params.id) {
              this.isNew = false
              return this.categoriesService.geById(params.id)
            }
            return of(null)
          }
        )
      )
      .subscribe((category: Category) => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.categoryImagePreview = category.image
            MaterializeService.updateTextFields()
          }
        },
        error => MaterializeService.toast(error.error.message)
      )

    this.form.enable()
  }

  ngAfterViewInit(): void {
    this.largeFileWarning = MaterializeService.initModal(this.largeFileWarningRef)
  }

  formInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    })
  }

  uploadFile(): void {
    this.uploadFileRef.nativeElement.click()
  }

  onFileUpload(event: Event): void {
    this.categoryImage = event.target['files'][0]

    const reader = new FileReader()

    reader.onload = () => {
      this.categoryImagePreview = reader.result
    }

    const imageMbSize = this.categoryImage.size / 1024 / 1024
    if (imageMbSize > 2) {
      this.largeFileWarning.open()
    }

    reader.readAsDataURL(this.categoryImage)
  }

  onSubmit(): void {
    let observable$: Observable<Category>

    this.form.disable()
    const name = this.form.get('name').value

    if (this.isNew) {
      observable$ = this.categoriesService.create(name, this.categoryImagePreview)
    } else {
      observable$ = this.categoriesService.update(this.category._id, name, this.categoryImagePreview)
    }

    observable$
      .subscribe(
        category => {
          this.category = category
          MaterializeService.toast('Изменения сохранены.')
          this.form.enable()
        },
        error => {
          MaterializeService.toast(error.error.message)
          this.form.enable()
        }
      )
  }

  deleteCategory(): void {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию ${this.category.name}?`)

    if (decision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterializeService.toast(response.message),
          error => MaterializeService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }
}
