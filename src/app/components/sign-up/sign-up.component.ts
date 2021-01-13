import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [NgAuthService]
})
export class SignUpComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService) { }

  ngOnInit() {

  }

  createUser(frm) {
    this.ngAuthService.SignUp(frm.value);
  }

}
