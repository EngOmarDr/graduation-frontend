import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/components/card-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Group } from '../models/group';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GroupService } from '../services/group.service';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';
import { Observable, of } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-update-group',
  imports: [
    RouterModule,
    CardComponent,
    CustomFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    CardComponent,
    NgSelectModule,
    AsyncPipe,
  ],
  templateUrl: './update-group.component.html',
})
export class UpdateGroupComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(GroupService);
  private activeRouter = inject(ActivatedRoute);
  private router = inject(Router);

  results = [];
  group: Group | undefined = undefined;

  form = this.fb.group({
    code: this.fb.control(this.group?.code == null ? '' : this.group!.code, [
      Validators.required,
    ]),
    name: [this.group?.name ?? '', [Validators.required]],
    parentId: [
      this.group?.parentId ?? undefined,
      { validators: [], disabled: true },
    ],
    notes: [this.group?.notes ?? ''],
  });

  groups$: Observable<Group[]> = of();

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  ngOnInit() {
    // Get the data passed from navigation
    this.groups$ = this.service.getGroups();
    const navigation = window.history.state;
    if (navigation.groupData) {
      this.group = navigation.groupData;
      this.form = this.fb.group({
        code: this.fb.control(
          this.group?.code == null ? '' : this.group!.code,
          [Validators.required]
        ),
        name: [this.group?.name ?? '', [Validators.required]],
        parentId: [
          this.group?.parentId ?? undefined,
          { validators: [], disabled: true },
        ],
        notes: [this.group?.notes ?? ''],
      });
    } else {
      // Fallback: if page refreshed, get ID from route and fetch from API
      const id = this.activeRouter.snapshot.paramMap.get('id');
      if (id) {
        this.service.getGroupById(Number.parseInt(id)).subscribe((next) => {
          this.group = next;
          this.form = this.fb.group({
            code: this.fb.control(this.group?.code ?? '', [
              Validators.required,
            ]),
            name: [this.group?.name ?? '', [Validators.required]],
            parentId: [
              this.group?.parentId ?? undefined,
              { validators: [], disabled: true },
            ],
            notes: [this.group?.notes ?? ''],
          });
        });
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.updateGroup(this.group?.id!, this.form.value).subscribe({
        next: (res) => {
          console.log('group created:', res);
          this.router.navigate(['/groups']);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
