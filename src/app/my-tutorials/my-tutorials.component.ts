import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TutorialService, Tutorial } from '../services/tutorial.service';
import { Subject, of } from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-my-tutorials',
  templateUrl: './my-tutorials.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./my-tutorials.component.css']
})
export class MyTutorialsComponent implements OnInit, OnDestroy {
  tutorials: Tutorial[] = [];
  loading = false;
  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  @Output() editTutorial = new EventEmitter<Tutorial>();

  constructor(private tutorialService: TutorialService) {}

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
    this.search$.next(query);
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
}
