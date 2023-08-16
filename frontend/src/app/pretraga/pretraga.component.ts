import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private lekariService: LekarService,private router:Router) { }

  tip:string;
  ngOnInit(): void {

    this.lekariService.dohvatiSve().subscribe((data:Lekar[])=>{      
    this.kartice=data;
    this.kartice2=this.kartice.slice();
    
    })
    const userType = sessionStorage.getItem('type');
    if(!userType){
      this.tip='guest';
    }
    else if(userType=='user'){
      this.tip='user';
    }
    else if(userType=='lekar'){
      this.tip='lekar';
    }
    else{
      this.tip='menadzer';
    }
  }
  kartice: Lekar[]=[]
  kartice2:Lekar[]=[]

  sortByNameAscending(): Lekar[]{
    return this.kartice.sort((a,b)=>{
      if(a.firstname<b.firstname){
        return -1;
      }else{
        if(a.firstname==b.firstname){
          return 0;
        }
        else{
          return 1;
        }
      }
    })
  }

  sortByNameDescending(): Lekar[]{
    return this.kartice2.sort((a,b)=>{
      if(a.firstname>b.firstname){
        return -1;
      }else{
        if(a.firstname==b.firstname){
          return 0;
        }
        else{
          return 1;
        }
      }
    })
  }
  
  sortByLastAscending(): Lekar[]{
    return this.kartice2.sort((a,b)=>{
      if(a.lastname<b.lastname){
        return -1;
      }else{
        if(a.lastname==b.lastname){
          return 0;
        }
        else{
          return 1;
        }
      }
    })
  }

  sortByLastDescending(): Lekar[]{
    return this.kartice2.sort((a,b)=>{
      if(a.lastname>b.lastname){
        return -1;
      }else{
        if(a.lastname==b.lastname){
          return 0;
        }
        else{
          return 1;
        }
      }
    })
  }

  sortBySpecAscending(): Lekar[]{
    return this.kartice2.sort((a,b)=>{
      if(a.specialization<b.specialization){
        return -1;
      }else{
        if(a.specialization==b.specialization){
          return 0;
        }
        else{
          return 1;
        }
      }
    })
  }

  sortBySpecDescending(): Lekar[]{
    return this.kartice2.sort((a,b)=>{
      if(a.specialization>b.specialization){
        return -1;
      }else{
        if(a.specialization==b.specialization){
          return 0;
        }
        else{
          return 1;
        }
      }
    })
  }

  showFilters: boolean = false;
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }



  searchAll(searchParam1 :string,searchParam2:string,searchParam3:string): Lekar[]{
    return this.kartice.filter(Lekar=>(Lekar.firstname.includes(searchParam1) && Lekar.lastname.includes(searchParam2) && Lekar.specialization.includes(searchParam3)));

  }



  filtriraj():Lekar[]{

    const param1 = document.getElementById('1') as HTMLInputElement | null;
    const param1V = param1?.value;
    const param2 = document.getElementById('2') as HTMLInputElement | null;
    const param2V = param2?.value;  
    const param3 = document.getElementById('3') as HTMLInputElement | null;
    const param3V = param3?.value;    

   
    this.kartice2=this.searchAll(param1V,param2V,param3V).slice();
    

    
    let checkedValue1 :string | undefined=undefined;
    const radioButtons1 = document.getElementsByName('sort') as NodeListOf<HTMLInputElement>;
    radioButtons1.forEach((radioButton) => {
      if (radioButton.checked) {
        checkedValue1 = radioButton.value;
      }
    });

    if(checkedValue1!==undefined){
      let checkedValue2 :string | undefined=undefined;
      const radioButtons2 = document.getElementsByName('sortOrder') as NodeListOf<HTMLInputElement>;
      radioButtons2.forEach((radioButton) => {
        if (radioButton.checked) {
          checkedValue2 = radioButton.value;
        }
      });
      if(checkedValue1=='1'){
        if(checkedValue2=='1'){
          this.sortByNameDescending();
        }
        else{
          this.sortByNameAscending();
        }
      }
      if(checkedValue1=='2'){
        if(checkedValue2=='1'){
          this.sortByLastDescending();
        }
        else{
          this.sortByLastAscending();
        }
      }
      if(checkedValue1=='3'){
        if(checkedValue2=='1'){
          this.sortBySpecDescending();
        }
        else{
          this.sortBySpecAscending();
        }
      }
    }
    return null;
  }


  profilLekar(username:string){
    sessionStorage.setItem('lekar',username);
    this.router.navigate(['/profil-lekar']);
  }



  prebaciNaLekare(id){

    let x=document.getElementById(id);

      const y=-70;
      const elPos=x.getBoundingClientRect().top;
      const offset=elPos+window.pageYOffset-y;
      window.scrollTo({
        top:offset,
        behavior:'smooth',
      })
    
  }

}
