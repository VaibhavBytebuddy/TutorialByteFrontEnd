import { Component, EventEmitter, Output } from '@angular/core';
import { TutorialService, Tutorial } from '../services/tutorial.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent {
  isModalOpen = false;
  mode: 'create' | 'edit' = 'create';
  saving = false;
  error = '';

  newTutorial: Tutorial = {
    title: '',
    description: '',
    category: '',
    published: false
  };

  @Output() saved = new EventEmitter<void>();

  constructor(private tutorialService: TutorialService) {}


  openModal(t?: Tutorial) {
    this.error = '';
    if (t) {
      this.mode = 'edit';

      this.newTutorial = { ...t };
    } else {
      this.mode = 'create';
      this.newTutorial = { title: '', description: '', category: '', published: false };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.saving = false;
  }

  save() {
    if (!this.newTutorial.title || !this.newTutorial.description) {
      this.error = 'Title and description are required';
      return;
    }
    this.saving = true;
    this.error = '';

    const payload: Partial<Tutorial> = {
      title: this.newTutorial.title,
      description: this.newTutorial.description,
      category: this.newTutorial.category,
      published: !!this.newTutorial.published
    };

    if (this.mode === 'create') {
      this.tutorialService.createTutorial(payload).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.saved.emit();
        },
        error: (err) => {
          this.saving = false;
          this.error = err?.error?.message || 'Failed to create tutorial';
        }
      });
    } else {
      // edit
      const id = (this.newTutorial as any).id;
      if (!id) {
        this.saving = false;
        this.error = 'Missing id for update';
        return;
      }
      this.tutorialService.updateTutorial(id, payload).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.saved.emit();
        },
        error: (err) => {
          this.saving = false;
          this.error = err?.error?.message || 'Failed to update tutorial';
        }
      });
    }
  }
}
