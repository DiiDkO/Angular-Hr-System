import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginUser } from '../models/loginUser.model';
import { Role } from '../models/role.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { LoginService } from '../services/login.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-new-role-form',
  templateUrl: './new-role-form.component.html',
  styleUrls: ['./new-role-form.component.css']
})

export class NewRoleFormComponent implements OnInit {
  @Input() options:Role;
  @Input() modal:NgbModalRef;
  currentUser:LoginUser;
  isAdmin:boolean = false;
  private errorMessages:string[] = [];
  private errorMsg:string;
  isRoleValid = null;
  confirmedResult = false;
  private readonly roleNameRegex:RegExp = /^[a-zA-Z_-]{2,50}$/gm;
  roleForm = new FormGroup({
    id: new FormControl({value:'', disabled:true}),
    name: new FormControl('',[Validators.required,Validators.minLength(2), Validators.maxLength(50)])
  })

  constructor(private roleService:RoleService,private loginService:LoginService, private router:Router,private confirmDialogService:ConfirmDialogService) { 
      this.loginService.currentUser.subscribe(x=> this.currentUser =x);
      this.isAdmin = this.currentUser.roles.includes("admin");
  }

  ngOnInit(): void {
    if(!this.currentUser)
        this.router.navigate(['/login']);
    else{  
        this.roleForm.get('name').valueChanges.subscribe(name=> {
          var regexMatch = name.match(this.roleNameRegex);
                if(regexMatch != null)
                    this.isRoleValid = true;
                 else
                    this.isRoleValid = false;
    });
      if(this.options)
              this.roleForm.patchValue({
              id:this.options.id,
              name:this.options.name
            })
    }
  }
  updateRole() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
                this.roleService.updateRole(this.roleForm.getRawValue())
                                .subscribe(data => {
                                  if(data) {
                                        this.modal.close('Cross Click');
                                        this.reloadPage(this.router);
                                  }
                                }, 
                                  (error:HttpErrorResponse) => {
                                              console.log(error.name + ' '+ error.message); 
                                  });
  } else 
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
  }

  public deleteRole() {
    this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
   .then((confirmed) => {
     if(confirmed)
         this._deleteRole();
   })
   .catch(() =>{ return false;});
 }
    private _deleteRole() {
      this.roleService.deleteRole(this.roleForm.getRawValue().id)
      .subscribe(data => {
        if(!data) {
          this.modal.close('Cross Click');
         this.reloadPage(this.router);
        }
      }, 
      (error:HttpErrorResponse) => {
        console.log(error.name + ' '+ error.message); 
      });
    }
  onSubmit() {
    var isFormValid = this.onSubmitValidation();
    if(isFormValid) {
            this.roleService.addNewRole(this.roleForm.getRawValue())
                            .subscribe(data => {
                                      if(data.id)
                                          this.router.navigate(['/roleList']);
    }, 
    (error:HttpErrorResponse) => {
      console.log(error.name + ' '+ error.message); 
    });
  } else 
        this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
  }
  private onSubmitValidation() {
    this.errorMsg = '';
    this.errorMessages = [];  
       
  var isFormValid = true;
  var roleForm = this.roleForm.getRawValue();
  var nameRegexCheck = roleForm.name.match(this.roleNameRegex);
  if(!roleForm.name || (!nameRegexCheck) || roleForm.name.length > 50 || roleForm.name.length < 2) {
     isFormValid = false;
     this.errorMessages.push('Role');
  }

  return isFormValid;
}



 private reloadPage(router:Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => router.navigate(['/roleList']));
  }

}
