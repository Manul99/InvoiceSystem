import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
   invoiceForm!: FormGroup
   items:any
   submittedInvoice:any
   private destroyed$ = new Subject<void>();
   errorMessage: string = '';
   loading: boolean = false;

  constructor(
    private  fb: FormBuilder,
    private invoiceSerice: InvoiceService
  ) { }

  ngOnInit(): void {
   this.invoiceForm = this.fb.group({
    transactionDate: ['',Validators.required],
    discount: [0],
    items: this.fb.array([
      this.createItem() // Initialize with one item
    ]),
   })

    
  }

  //Form Array getter
  get item(): FormArray{
    return this.invoiceForm.get('items') as FormArray;
  }

  //Create a new item form group
  createItem(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
    })
  }

  //Submit the Invoice
  submitInvoice(){
    if(this.invoiceForm.invalid){
      alert("Please fill all required fields");
      return;
    }

    this.loading = true;

    const payload = {
      ...this.invoiceForm.value,
    };
    this.invoiceSerice.generatetInvoices(payload).subscribe({
      next: (response) => {
        this.submittedInvoice = response;
         this.invoiceForm.reset({
          transactionDate: '',
          discount: ''
        });
        this.item.clear();
        this.addItem();
        this.loading = false;

         setTimeout(() => {
        this.errorMessage = '';
      }, 7000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error:', error);
        this.errorMessage = error?.error?.message || 'An error occurred. Please try again.';

         setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
      }
    });

  }

    // Remove item
  removeItem(event:number):void{
    this.item.removeAt(event);
  }

  //Add new item
  addItem(){
    this.item.push(this.createItem());
  }

  //To clean up resources and prevent memory leaks
  ngOnDestroy(): void {
     this.destroyed$.next();
     this.destroyed$.complete();  
  }
}
