import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  renderComponent: String = "home";
  private authStatusSub : Subscription;
  userIsAuth = false
  username:string = localStorage.getItem('user');


  constructor(private authService:AuthService){
    this.username = localStorage.getItem('user');
  }


  renderHome(){
    this.renderComponent = "home";
  }
  ngOnDestroy() {
}

  renderProfile(){
    this.renderComponent = "profile";
  
  }

  renderMySubmissions() {
    this.renderComponent = "my-submissions";

  }

  renderCategories(){
    this.renderComponent = "categories";
  }

  renderAdmin() {
    this.renderComponent = "Admin";
  }

  renderFeedback() {
    this.renderComponent = "feedback";
  }


  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatus().subscribe(isAuthenticated =>{
      this.userIsAuth = isAuthenticated;
    })
  }



}
