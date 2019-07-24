import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../classes/User';
import { freeApiService } from '../services/freeapi.services';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  user: User = new User();
  id: any = '';
  constructor(private route: ActivatedRoute,
    private router: Router, private apiservice:freeApiService) {
    
    
   }

   ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('id');

    console.log(this.id);
    this.apiservice.getuserbyid(this.id).subscribe(
      data=>
      {
      
        this.user = data ;
        
        console.log('response result',this.user);
     
      }
    );

  }

  deleteuser(){
    this.apiservice.deleteuserbyid(this.id).subscribe(data=>{

    });
  }

}
