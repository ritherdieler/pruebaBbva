import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatPaginator} from "@angular/material/paginator";
import {CustomerService} from "../../services/customer.service";
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatRow,
  MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";
import {MatSort} from "@angular/material/sort";
import {UpdateCustomerRequest} from "../../models/request/UpdateCustomerRequest";
import {SaveCustomerRequest} from "../../models/request/SaveCustomerRequest";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {SaveCustomerDialogComponent} from "../../components/save-customer-dialog/save-customer-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {Customer} from "../../models/response/Customer";

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    MatFormField,
    MatPaginator,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatInput,
    MatSort,
    MatLabel,
    MatTableModule,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'names', 'age', 'actions'];
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private customerService: CustomerService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCustomers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openSaveCustomerDialog(): void {
    const dialogRef = this.dialog.open(SaveCustomerDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result: SaveCustomerRequest) => {
      if (result != undefined) {
        this.saveCustomer(result)
      }
    });
  }

  openUpdateCustomerDialog(customer: Customer) {
    const dialogRef = this.dialog.open(SaveCustomerDialogComponent, {
      width: '350px',
      data: { customer: customer }
    });
    dialogRef.afterClosed().subscribe((result: UpdateCustomerRequest) => {
      if (result != undefined) {
        this.updateCustomer(customer.id, result)
      }
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.dataSource.data = response
      },
      error: (e) => console.error(e),
    })
  }

  getCustomerById(id: number) {
    this.customerService.getCustomerById(id).subscribe({
      next: (response) => {

      },
      error: (e) => console.error(e)
    })
  }

  saveCustomer(request: SaveCustomerRequest) {
    this.customerService.saveCustomer(request)
      .subscribe({
        next: (result) => {
          console.log("Cliente registrado")
          this.getCustomers()
        },
        error: (e) => console.error(e)
      })
  }

  updateCustomer(customerId: number, request: UpdateCustomerRequest) {
    this.customerService.updateCustomer(customerId, request)
      .subscribe({
        next: (result) => {
          console.log("Cliente Actualizado")
          this.getCustomers()
        },
        error: (e) => console.error(e)
      })
  }

  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer.id)
      .subscribe({
        next: (response) => {
          this.getCustomers()
        },
        error: (e) => console.error(e)
      })
  }

}
