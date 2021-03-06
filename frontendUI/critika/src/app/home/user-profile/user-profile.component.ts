import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input('chosenUser') chosenUser:string;
  @Output() returnToParent = new EventEmitter<string>();
  displayUser:Profile
  r:number;

  constructor(private proService:ProfileService) { }

  ngOnInit() {
    this.proService.getUser(this.chosenUser).subscribe((res) =>{
      this.displayUser = new Profile(res);
      let p:number = this.displayUser.ratingNum - 1;
      this.r = this.displayUser.rating/p;
      console.log(this.displayUser);
    })
  }

  returnToDashboard() {
    this.returnToParent.emit('dash');
  }

}
