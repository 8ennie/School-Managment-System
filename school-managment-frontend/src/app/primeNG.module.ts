import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
    imports: [
        DataViewModule,
        MultiSelectModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        ToastModule,
        ContextMenuModule,
        MenuModule,
        CheckboxModule

    ],
    exports: [
        DataViewModule,
        MultiSelectModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        ToastModule,
        ContextMenuModule,
        MenuModule,
        CheckboxModule
    ],
    providers: [MessageService]
})
export class PrimeNGModule { }
