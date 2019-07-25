import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { freeApiService } from '../services/freeapi.services';
import { User } from '../classes/User';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  updateresult: User = new User();
  constructor(private route: ActivatedRoute,
    private apiservice:freeApiService) {
    
    
   }


  ngOnInit() {
    console.log("msgg",this.updateresult);
    let id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    
    //console.log(id);
    this.apiservice.getuserbyid(id).subscribe(
      data=>
      {
      
        this.updateresult = data ;
        
        console.log('response result',this.updateresult);
     
      }
    );

  }

  updateuser(){
    console.log(this.updateresult);
    this.apiservice.updateuser(this.updateresult).subscribe(
      data=>
      {
 
        console.log(' result',data);
     
      }
    );
  }


 

}
