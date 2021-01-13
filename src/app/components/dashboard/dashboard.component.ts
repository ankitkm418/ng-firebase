import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgAuthService]
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(public auth: NgAuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
        console.log(user)
        // console.log(user.metadata.creationTime)
      })
  }

  login() {
    this.router.navigate(['/sign-in']);
  }

  logout() {
    this.auth.SignOut();
  }

  register() {
    this.router.navigate(['register-user']);
  }

  forgot() {
    this.router.navigate(['forgot-password']);
  }
  country() {
    this.router.navigate(['country']);
  }
}
