import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupMapper } from '../mappers/group.mapper';
import { Group } from '../models/group.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private headers = null;
  private user = null;
  private readonly url = "http://localhost:8080/groups";
  private readonly userUrl = "http://localhost:8080/users"
  private readonly addGroupRoleRelUrl = "/create/group_role";
  private readonly deleteGroupRoleUrl = "/delete/group_role"; 
  private readonly addGroupUserRelUrl = "/group_joiner";
  private readonly deleteGroupUserRelUrl = "/group_leaver";
  constructor(private groupHttp: HttpClient, private mapper:GroupMapper, private loginService:LoginService) { 
    this.user = this.loginService.currentUserValue;
    this.headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization','Basic ' + btoa( this.user.username + ':' +this.user.password))
    .set('Access-Control-Allow-Origin','http://localhost:4200')
    .set( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  }

  getAllGroups() {
    return this.groupHttp.get<Group[]>(this.url, {headers:this.headers});
  }
  addNewGroup(group:Group) {
    return this.groupHttp.post<Group>(this.url,this.mapper.mapToEntity(group), {headers:this.headers});
  }
  addNewGroupMember(userId:number, groupId:number) {
    const endpoint = this.userUrl + this.addGroupUserRelUrl + '/' +userId + '/'+groupId;
    return this.groupHttp.post<any>(endpoint,{}, {headers:this.headers});
  }
  deleteGroupMember(userId:number, groupId:number) {
    const endpoint = this.userUrl + this.deleteGroupUserRelUrl + '/' +userId + '/'+groupId;
    return this.groupHttp.post<any>(endpoint,{}, {headers:this.headers});
  }
  addNewGroupRole(roleId:number, groupId:number) {
    const endpoint = this.url + this.addGroupRoleRelUrl + '/' +roleId + '/'+groupId;
    return this.groupHttp.post<any>(endpoint,{}, {headers:this.headers});
  }
  deleteGroupRole(roleId:number, groupId:number) {
    const endpoint = this.url + this.deleteGroupRoleUrl + '/' +roleId + '/'+groupId;
    return this.groupHttp.post<any>(endpoint,{}, {headers:this.headers});
  }
  updateGroup(group:Group) {
    const endpoint = this.url +'/' + group.id;
    console.log(this.mapper.mapToEntity(group));
    return this.groupHttp.put<Group>(endpoint,this.mapper.mapToEntity(group), {headers:this.headers});
  }
  deleteGroup(id:number) {
    const endpoint = this.url +'/' + id;
    return this.groupHttp.delete<Group>(endpoint, {headers:this.headers});
  }
}
