import { NgAuthService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [NgAuthService]
})
export class SignInComponent implements OnInit {

  constructor(private auth: NgAuthService) { }

  ngOnInit(): void {
  }

  login(frm: any) {
    this.auth.SignIn(frm.value.email, frm.value.password);
  }
}
