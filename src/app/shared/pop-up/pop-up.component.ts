import { Component,EventEmitter,Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();
  // localUrl:any;
  popUpText:any;
  constructor(
    private router: Router,
    private  dialogRef : MatDialogRef <PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      // this.localUrl = data.img;
      this.popUpText = data.msg;
     }

  ngOnInit(): void {
    
  }
  onOk(){
    // this.onClick.emit();
  }
  closeDialog() {
    // this.router.navigate(['/products']);
    this.dialogRef.close({ event: 'close' });
    // this.router.navigate(['/products']);
  }
}
