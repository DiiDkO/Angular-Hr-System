import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';

export class RoleMapper  {
 
  
    private mappedList:any[] = [];
    private map (roleId:number, service:RoleService,isForUpdate:boolean){
      service.getRoleById(roleId)
             .subscribe(  data => {
                    if(isForUpdate)
                        this.mappedList.push(data.id);
                    else
                        this.mappedList.push(data);
              })
      }
   mapList(entityList: any[], service:RoleService, isForUpdate:boolean) {
        this.mappedList = [];
        entityList.forEach( roleId => {
                   this.map(roleId,  service, isForUpdate);
        })
     return  this.mappedList;
 };
    
}