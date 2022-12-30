import { Directive,  HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownDeclaration]'
})
export class DropdownDeclarationDirective {

 @HostBinding('class.open') isOpen = false;

 @HostListener('click') toggleDropdown(){
    this.isOpen= !this.isOpen
  }

 

  

}
