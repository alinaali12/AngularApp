import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { Permission } from './Permission';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Directive({
  selector: '[appCheckpermission]'
})
export class CheckpermissionDirective implements OnInit {
  @Input('appCheckpermission') Name: string;
  Permissions = [];
  getPermission = [];
  Path ;
  constructor(private el: ElementRef, private Serviceobj: DataserviceService, private router: Router) {
   }
   ngOnInit() {
   this.getPermission = this.Serviceobj.GetPageData();
   this.setPermissiondata();
   }
   setPermissiondata() {
    this.Path = 'http://localhost:4000' + this.router.url ;
    console.log('href', this.Path);
   // this.getPermission = per;
    console.log('set', this.getPermission);
    this.getPermission.forEach(perm => {
      if (perm.pageUrl === this.Path && perm.pagePermission === 'false') {
          console.log('denied');
          this.router.navigate(['/error']);
        } else {
      }
     });
    // console.log('per', this.getPermission);

   }

}
