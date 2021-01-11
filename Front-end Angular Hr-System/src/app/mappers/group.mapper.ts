import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { UserMapper } from './user.mapper';
import { RoleMapper } from './role.mapper';
import { Group } from '../models/group.model';
export class GroupMapper  {
 

    private mappedList:any[] = [];
    
     mapToDto(entity: any, userService:UserService, roleService:RoleService, isForUpdate:boolean) {
      var userMapper:UserMapper = new UserMapper();
      var roleMapper:RoleMapper = new RoleMapper();
       var group = {
            id: entity.id,
            name: entity.name,
            email:entity.email,
            roles:[],
            users:[],
            manager:null
        }
        if(entity.manager)
           group.manager = userMapper.mapManager(entity.manager, userService, group);
        if(entity.roles)
           group.roles = roleMapper.mapList(entity.roles, roleService, isForUpdate);
        if(entity.users)
           group.users = userMapper.mapListById(entity.users, userService);
        return group;
    };

    mapToDtoList(entityList: any[], userService:UserService, roleService:RoleService, isForUpdate:boolean) {
       this.mappedList = [];
       entityList.forEach(group => {
           this.mappedList.push(this.mapToDto(group,userService,roleService,isForUpdate));
        })
        return this.mappedList;
        
    };

    mapToEntity(group) {
       var roleIds:number[] = [];
       var userIds:number[] = [];
      if(group.roles.length > 0)
         group.roles.forEach(role => roleIds.push(role.id));
      if(group.members.length > 0)
         group.members.forEach(member => userIds.push(member.id));
       return {
         name: group.name,
         email:group.email,
         roles: roleIds,
         users:  [],
         manager: group.manager ? group.manager.id : null
       }
    }

}
