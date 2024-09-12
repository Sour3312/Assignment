import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  dataForm: FormGroup;  // FormGroup to manage form control state
  imageUrl: string = '';  // Stores the URL of the uploaded image

  constructor(
    private route: Router,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) { }

  // Initialize the form with validation rules
  ngOnInit(): void {
    this.dataForm = this.fb.group({
      text: ['', Validators.required],  // 'text' field is required
      mediaUrl: ['', Validators.required]  // 'mediaUrl' field is required
    });
  }

  // Handles form submission
  onSubmit() {
    if (this.dataForm.valid) {
      // Prepare the form data
      const formData = {
        text: this.dataForm.value.text,
        mediaUrl: this.imageUrl  // Using the imageUrl set during file upload
      };

      // Call the API to create a new quote
      this.sharedService.createQuote(formData).subscribe(
        (response) => {
          // console.log('API Response:', response);
          alert('Quote created successfully!');
          this.dataForm.reset();  // Reset the form after successful submission
          this.route.navigate(['/dash']);  // Navigate to the dashboard
        },
        (error) => {
          console.error('API Error:', error);
          alert('Failed to create quote. Please try again.');
        }
      );
    } else {
      alert('Both fields are required');
    }
  }

  // Navigates back to the dashboard
  navigateToDashboard() {
    this.route.navigate(['/dash']);
  }

  // Handles file upload and sends the image to the server
  openFileToSaveImage(event: any) {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      // Check if the file is of the allowed types (jpeg or png)
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          const formData = new FormData();
          formData.append("file", file, file.name);

          // Send the image to the server and get the image URL in response
          this.sharedService.createImageUrl(formData).subscribe((res) => {
            this.imageUrl = res[0].url;  // Store the uploaded image URL
          });
        };
      } else {
        alert('Image type should be jpeg/png');
      }
    }
  }

  // Closes the current view and navigates back to the dashboard
  close() {
    this.route.navigate(['/dash']);
  }
}
