import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export class UserMapper  {
 
  
    private mappedList:any[] = [];
    mappedUser:any;
    map(entity: any, service:UserService) {
       var user = {
            id: entity.id,
            username: entity.username,
            firstName: entity.firstName,
            middleName: entity.middleName,
            lastName: entity.lastName,
            email: entity.email,
            manager:null,
            password:entity.password,
            groups :entity.groups,
            active:entity.active,
        }
        if(entity.manager)
           this.mapManager(entity.manager, service, user);
        return user;
    };

    mapList(entityList: any[], service:UserService) {
      this.mappedList = [];
       entityList.forEach(user => {
           this.mappedList.push(this.map(user, service));
        })
        return this.mappedList;
        
    };

    mapListById(entityList: any[], service:UserService) {
      this.mappedList = [];
      entityList.forEach(userId => {
         service.getUserById(userId)
         .subscribe(data => {
            if(data)
            this.mappedList.push(data);
         })
        
      })
      return this.mappedList;
    }

     mapManager(id, userService, user) {
        userService.getUserById(id).subscribe(data =>  {
           if(user.id)
             user.manager =  this.map(data, userService);
        })
   }
    
   mapUser(user:User) {
      return {
         username: user.username,
         firstName: user.firstName,
         middleName: user.middleName,
         lastName: user.lastName,
         email: user.email,
         manager: user.manager ? user.manager.id : null,
         password:user.password,
         groups:user.groups,
         active:user.active
      }
   }
}