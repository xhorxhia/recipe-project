import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { ImageUploadService } from './image-upload.service';

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.css']
})
export class ImageUploadDialogComponent{
  constructor(public _dialogRef: MatDialogRef<ImageUploadDialogComponent>, private _uploadService: ImageUploadService, private _snackBar: MatSnackBar) {
    this._dialogRef.disableClose = true;
  }

  selectedFile!: File;
  selectedFileAsBase64!: string;
  retrievedImage: any;

  promptConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 2 * 1000
  }

  public onFileChanged(event: Event) {
    // Since Angular has been set for a strict-type mode, we need to get the selected file through 3 lines of code instead of only 1. ¯\_(ツ)_/¯
    // https://stackoverflow.com/questions/59208257/file-input-event-type-in-angular
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];

    this._uploadService.convertFileToBase64(this.selectedFile).subscribe(
      (base64) => {
        this.selectedFileAsBase64 = base64;
        this.retrievedImage = 'data:image/png;base64,' + base64;
      }
    );
  }

  public onUpload(){
    if(this.selectedFile === undefined){
      this._snackBar.open("No File Uploaded", 'OK', this.promptConfig);
    }
    else if(this.selectedFile.type != "image/png" && this.selectedFile.type != "image/jpeg") {
      this._snackBar.open("Uploaded File's Type is not allowed", 'OK', this.promptConfig);
    }
    else{
      const uploadImageData = new FormData();
      uploadImageData.append("uploadedFileName", this.selectedFile.name);
      uploadImageData.append("uploadedFileType", this.selectedFile.type);
      uploadImageData.append("uploadedFileContent", this.selectedFileAsBase64);

      console.log(this.selectedFile.type)

      this._uploadService.uploadImage(uploadImageData)
      .subscribe(
        (res) => {
          this._dialogRef.close(res.body.id);
        }
      )
    }
  }
}
