import { Component } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';
// import { PopUpComponent } from './shared/pop-up/pop-up.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopBridge';
  constructor(private  dialogRef : MatDialog){}
  // openDialog(){
  //   this.dialogRef.open(PopUpComponent);
  // }
}
