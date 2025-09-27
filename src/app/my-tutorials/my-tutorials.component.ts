import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TutorialService, Tutorial } from '../services/tutorial.service';
import { Subject, of } from 'rxjs';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-my-tutorials',
  templateUrl: './my-tutorials.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,

  ],
  styleUrls: ['./my-tutorials.component.css']
})
export class MyTutorialsComponent implements OnInit, OnDestroy {
  tutorials: Tutorial[] = [];
  loading = false;
  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  @Output() editTutorial = new EventEmitter<Tutorial>();
  category: string='';

  constructor(private tutorialService: TutorialService) {
  }

  ngOnInit() {

    this.loadTutorials();
  }

  loadTutorials() {
    this.loading = true;

    this.tutorialService.getTutorials().subscribe(data => {

      this.tutorials = data;
      this.loading = false;
    });
  }


  search(query: string) {
    debugger;
    this.tutorialService.searching(query).subscribe(data => {
      this.tutorials = data;
      console.log(data);
      this.loading = false;
    },error => {
      if (error.status == 404) {
        this.tutorials = [{title:'Tutorials not Found',description:'No tutorials match your search',category:'' ,published:false }];
      }
    });
  }

  onEdit(t: Tutorial) {
    this.editTutorial.emit(t);
  }

  onDelete(t: Tutorial) {
    if (!confirm('Delete this tutorial?')) return;
    const id = (t as any).id;
    this.tutorialService.deleteTutorial(id).subscribe({
      next: () => this.loadTutorials(),
      error: () => alert('Delete failed')
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPublished() {
    this.tutorialService.getPublished().subscribe((resp) => {
      this.tutorials = resp;
    },(error)=>{
      if (error.status == 404) {
        this.tutorials=[{title:'No Tutorial',description:'No published tutorials Right now',category:'' ,published:true }];
      }
    })
  }


  getDraft() {
    this.tutorialService.getDraft().subscribe((resp) => {
     this.tutorials=resp;
    })
  }

  filterByCategory(selectedCategory: string) {
    this.category = selectedCategory;
    console.log("Selected Category:", this.category);

    this.tutorialService.filterByCategory(this.category).subscribe({
      next: (resp) => {
        this.tutorials = resp;
        console.log("Filtered Tutorials:", this.tutorials);
      },
      error: (err) => {
       if (err.status === 404) {
         this.tutorials=[{title:'Tutorials not Found',description:'This category has no tutorials Right now',category:this.category ,published:false }];
       }
      }
    });
  }




}
