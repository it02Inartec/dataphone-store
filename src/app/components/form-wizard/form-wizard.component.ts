import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.css']
})
export class FormWizardComponent implements OnInit {

  countries;
  flag: number;
  fileData: File = null;
  allFiles: any = [];
  previewUrl: any = null;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formStepOne = { active: true, submitted: false };
  formStepTwo = { active: false, submitted: false };
  formStepThree = { active: false, submitted: false };
  datePattern: any = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((18|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((18|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;

  formGroupStepOne: FormGroup;
  formGroupStepTwo: FormGroup;
  formGroupStepThree: FormGroup;

  createFormGroupStepOne() {
    return new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      date: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      typedocument: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      codepostal: new FormControl(''),
    });
  }

  createFormGroupStepTwo() {
    return new FormGroup({
      company: new FormControl('', [Validators.required]),
      rif: new FormControl('', [Validators.required]),
      addresscompany: new FormControl('', [Validators.required]),
      phonecompany: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.minLength(4), Validators.maxLength(500)]),
      upfile: new FormControl(''),
      codepostalcompany: new FormControl('', [Validators.required]),
      contry: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
    });
  }

  createFormGroupStepThree() {
    return new FormGroup({
      product: new FormControl('', [Validators.required]),
    });
  }

  constructor(private generalService: GeneralService) {
    this.formGroupStepOne = this.createFormGroupStepOne();
    this.formGroupStepTwo = this.createFormGroupStepTwo();
    this.formGroupStepThree = this.createFormGroupStepThree();
  }

  ngOnInit() {
    this.generalService.getCountry()
      .subscribe((response: any) => {
        this.countries = response;
      });
  }

  onSubmitStepOne() {
    this.formStepOne.submitted = true;

    //if (this.formGroupStepOne.valid) {
      this.formStepOne.active = false;
      this.formStepTwo.active = true;
    //}
  }

  onSubmitStepTwo() {
    this.formStepTwo.submitted = true;

    //if (this.formGroupStepTwo.valid) {
    this.formStepTwo.active = false;
    this.formStepThree.active = true;
    //}
  }

  onSubmitStepThree() {
    this.formStepThree.submitted = true;

    if (this.formGroupStepThree.valid) {
      this.formStepThree.active = false;
    }
    // console.warn(this.formGroupStepOne.value);
  }

  previusAction() {
    if (this.formStepTwo.active === true) {
      this.formStepTwo.active = false;
      this.formStepOne.active = true;
    } else {
      this.formStepThree.active = false;
      this.formStepTwo.active = true;
    }
  }

  delete(bot) {
    console.log(bot);
  }

  onReadURL(input) {
    if (input.target.files && input.target.files.length > 0) {

          for (const file of input.target.files) {
            this.allFiles.push(file);
            const fila = '<tr><td>' + file.name +
            '</td><td>AJA 2</td><td><button type="button" (click)="delete(this)" class="btn btn-success">Delete</button></td></tr>';
            $('#table-documents').append(fila);
          }

          //this.fileData = input.target.files[0];
          // const reader = new FileReader();
          // reader.readAsDataURL(this.fileData);
          // reader.onload = (e) => {
          //   if (e.target) {
          //     $('.your_picture_image').attr('src', reader.result);
          //   }
          // };

          // Show preview
          // this.fileData = input.target.files[0];
          // const mimeType = this.fileData.type;
          // if (mimeType.match(/image\/*/) == null) {
          //   return;
          // }
          // const reader = new FileReader();
          // reader.readAsDataURL(this.fileData);
          // reader.onload = (e) => {
          //   this.previewUrl = reader.result;
          // };
      }
  }

  get first_name() { return this.formGroupStepOne.get('first_name'); }
  get last_name() { return this.formGroupStepOne.get('last_name'); }
  get email() { return this.formGroupStepOne.get('email'); }
  get date() { return this.formGroupStepOne.get('date'); }
  get phone() { return this.formGroupStepOne.get('phone'); }
  get address() { return this.formGroupStepOne.get('address'); }
  get document() { return this.formGroupStepOne.get('document'); }
  get gender() { return this.formGroupStepOne.get('gender'); }
  get typedocument() { return this.formGroupStepOne.get('typedocument'); }
  get codepostal() { return this.formGroupStepOne.get('codepostal'); }

  get company() { return this.formGroupStepTwo.get('company'); }
  get rif() { return this.formGroupStepTwo.get('rif'); }
  get addresscompany() { return this.formGroupStepTwo.get('addresscompany'); }
  get phonecompany() { return this.formGroupStepTwo.get('phonecompany'); }
  get profession() { return this.formGroupStepTwo.get('profession'); }
  get role() { return this.formGroupStepTwo.get('role'); }
  get upfile() { return this.formGroupStepTwo.get('upfile'); }
  get codepostalcompany() { return this.formGroupStepTwo.get('codepostalcompany'); }
  get contry() { return this.formGroupStepTwo.get('contry'); }
  get city() { return this.formGroupStepTwo.get('city'); }
  get salary() { return this.formGroupStepTwo.get('salary'); }

  get product() { return this.formGroupStepTwo.get('product'); }

}
