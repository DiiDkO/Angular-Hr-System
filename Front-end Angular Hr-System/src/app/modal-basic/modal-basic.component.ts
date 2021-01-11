import {Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../services/role.service';
@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})

export class ModalBasicComponent implements OnInit {
  closeResult = '';
  private modalSize:string;
  @Input() options:{};
  @Input() label:string;
  constructor(private modalService: NgbModal, private roleService:RoleService) { }
  open(content) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true,size:this.modalSize}).result.then((result) => {
    }, (reason) => {
      this.getDismissReason(reason);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    if(this.label == "Role" || this.label == "Group" || this.label == 'Leave Type')
      this.modalSize = 'md';
      else 
      this.modalSize = 'xl';
  }

}
