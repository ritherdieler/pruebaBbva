import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Customer } from "../../models/response/Customer";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-save-customer-dialog',
  templateUrl: './save-customer-dialog.component.html',
  standalone: true,
  imports: [
    MatLabel,
    MatError,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    NgIf
  ],
  styleUrls: ['./save-customer-dialog.component.css']
})
export class SaveCustomerDialogComponent implements OnInit {
  customerForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<SaveCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer|null },
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      names: ['', [Validators.required, Validators.minLength(2)]],
      age: [0, [Validators.required, Validators.max(99), Validators.min(1)]],
    });

    if (this.data && this.data.customer) {
      this.customerForm.patchValue({
        names: this.data.customer.names,
        age: this.data.customer.age
      });
    }
  }

  saveCustomer() {
    const raw = this.customerForm.getRawValue();
    this.dialogRef.close(raw);
  }
}
