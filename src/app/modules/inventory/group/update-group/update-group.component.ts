import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/components/card-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Group } from '../models/group';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GroupService } from '../services/group.service';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';

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
  ],
  templateUrl: './update-group.component.html',
})
export class UpdateGroupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(GroupService);
  private activeRouter = inject(ActivatedRoute);
  private router = inject(Router);

  results = [];
  group: Group | null = null;

  form: FormGroup = this.fb.group({});

  ngOnInit() {
    // Get the data passed from navigation
    const navigation = window.history.state;
    if (navigation.groupData) {
      this.group = navigation.groupData;
      this.form = this.fb.group({
        code: this.fb.control(this.group?.code ?? '', {
          validators: [Validators.required],
        }),
        name: [this.group?.name ?? '', [Validators.required]],
        parentId: [
          this.group?.parentId! ?? '',
          { validators: [], disabled: true },
        ],
        notes: [this.group?.notes],
      });
    } else {
      // Fallback: if page refreshed, get ID from route and fetch from API
      const id = this.activeRouter.snapshot.paramMap.get('id');
      if (id) {
        this.service.getGroupById(Number.parseInt(id)).subscribe((next) => {
          this.group = next;
          this.form = this.fb.group({
            code: this.fb.control(this.group?.code ?? '', {
              validators: [Validators.required],
            }),
            name: [this.group?.name ?? '', [Validators.required]],
            parentId: [
              this.group?.parentId! ?? '',
              { validators: [], disabled: true },
            ],
            notes: [this.group?.notes],
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
