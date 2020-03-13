import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';



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
        CheckboxModule,
        InputTextareaModule,
        DynamicDialogModule,
        DialogModule,
        CalendarModule
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
        CheckboxModule,
        InputTextareaModule,
        DynamicDialogModule,
        DialogModule,
        CalendarModule
    ],
    providers: [MessageService]
})
export class PrimeNGModule { }
