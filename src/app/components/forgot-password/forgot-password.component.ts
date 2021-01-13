import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [NgAuthService]
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService) { }
  ngOnInit(): void {
  }

}
