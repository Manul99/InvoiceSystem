import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent {
   invoiceForm!: FormGroup
   items:any
   submittedInvoice:any
  constructor() { }

  ngOnInit(): void {
   this.invoiceForm = new FormGroup({
    
   })

    
  }

  submitInvoice(){

  }

  removeItem(event:any){

  }

  addItem(){

  }
}
