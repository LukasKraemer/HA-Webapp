import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-python',
  templateUrl: './python.component.html',
  styleUrls: ['./python.component.css']
})
export class PythonComponent implements OnInit {
  pythonRes: string;
  state = [filesStorage => 0, DatenbankLast => 0];
  datenbankLast: number;
  filesStorage: number;
  txtFile = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  ring = false;

  constructor(private service: UserService,
              private auth: AuthService) {}
  data: any[];
  isShowPython = false;
  isShowNumbers = false;
  isShowFiles = false;
  missing: any;
  filenames: Observable<any> = this.service.getFilenames();

  file = new FormControl('');

  fileData: any = ``;


  ngOnInit(): void {
    this.auth.check();
  }

  showFiles(): void {
      this.filenames.subscribe((data) => {
      this.data = data.filename;
      console.log(this.data);
      });
  }

  startPython(): void {
    this.service.startPython().subscribe((resp) => {
      this.pythonRes =  resp.shell.replace('\n', '<br>');
      this.ring = false;
      });
    this.pythonRes = 'please wait!!!';
    this.ring = true;
    this.isShowPython = true;
  }

  getCurrentDataState(): void {
    this.service.getCurrentDataState().subscribe( (data) => {
      this.datenbankLast = data.databaseLast;
      this.filesStorage = data.filesStorage;
    });
    this.isShowNumbers = true;
  }

  uploadTxtFile(): void{
    this.service.txtUpload(this.fileData).subscribe((data) => {
     console.log(data);
   });
  }

  fileChange(event): void {
    const file = event.target.files[0];
    console.log('finfo', file.name, file.size, file.type);
    const formData = new FormData();
    formData.append('txtFile', file, file.name);
    this.fileData = formData;
  }
  downloadFile(response: any, fileName): void{
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (fileName) {
      downloadLink.setAttribute('download', fileName);
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  loadMissing(): void{
    this.data = [];
    const regex = /[\/:.]/gm;
    this.service.getMissing().subscribe((data) => {
        for (let i = 0; i < data.missing.length - 1; i++) {
          this.data.push('Trip_' +  data.missing[i].replace(/.[0-9]{3}$/gm, '').replace(regex, '-').replace(' ', '_') + '.txt');
        }
      });
  }

  loadValue(name: Element): void {
      const fileName = name.innerHTML;
      this.service.getTxt(fileName).subscribe((response: any) => {
      const newName = fileName.replace('txt', 'csv');
      this.downloadFile(response, newName);
    });
  }
}
