import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [
        DataViewModule,
        MultiSelectModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        ToastModule

    ],
    exports: [
        DataViewModule,
        MultiSelectModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class PrimeNGModule { }
