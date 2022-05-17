import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | any; ; // Variable to store file
  localUrl: any[];
 @Output() imagePath = new EventEmitter<any>();
  // Inject service 
  constructor() {
    
   }

  ngOnInit(): void {
  }

  // On file Select
//   onChange(event:any) {
//       console.log("event",event.value);
//     //   this.file = event.target.files[0];
//   }

    showPreviewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
                // console.log( this.localUrl );
                this.imagePath.emit(this.localUrl);
            }
            reader.readAsDataURL(event.target.files[0]);
            // console.log(event.target.files[0]);
            
        }
    }

  // OnClick of button Upload
//   onUpload() {
//       this.loading = !this.loading;
//       console.log(this.file);
//     //   this.shortLink = event.link;

//                 //   this.loading = false;
//     //   this.fileUploadService.upload(this.file).subscribe(
//     //       (event: any) => {
//     //           if (typeof (event) === 'object') {

//     //               // Short link via api response
//     //               this.shortLink = event.link;

//     //               this.loading = false; // Flag variable 
//     //           }
//     //       }
//     //   );
//   }
}
