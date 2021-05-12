import { Component } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  title = 'idul-fitri';

  url : String | ArrayBuffer;
  input : any;

  button : Boolean = false;

  data : any;
  
  constructor(private exportAsService : ExportAsService, private toastr : ToastrService){}

  exportAsConfig: ExportAsConfig = {
    type: 'png', // the type you want to download
    elementIdOrContent: 'image', // the id of html/table element
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.button = true;
      }
    }
  }
  reset(){
    this.url = null;
    this.button = false;
  }

  download() {
    this.toastr.success("Gambar berhasil di Download","Sukses");
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'save_image').subscribe(() => {
      // save started
    });

    this.exportAsService.get(this.config).subscribe(content => {
      console.log(content);
    });
  }

  onKeyUp(x){
    this.data = x.target.value;
    console.log(this.data);
    if(this.url !== "./assets/images/unknown_person.png"){
      this.button = true;
    }
  }
}
