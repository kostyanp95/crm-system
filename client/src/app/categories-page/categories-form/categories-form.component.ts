import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService } from "../../shared/services/categories.service";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { MaterializeService } from "../../shared/services/materialize.service";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [null, [Validators.required]]
  })
  isNew: boolean = true

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private categoriesService: CategoriesService) {
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

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoriesService.geById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(category => {
          if (category) {
            this.form.patchValue({
              name: category.name
            })
            MaterializeService.updateTextFields()
          }
          this.form.enable()
        },
        error => MaterializeService.toast(error.error.message)
      )
  }

  onSubmit(): void {

  }
}
