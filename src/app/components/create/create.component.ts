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
export class CreateComponent implements OnInit{

  constructor(private route: Router, private sharedService: SharedService,private fb: FormBuilder) { }
  
  dataForm: any = FormGroup;
  imageUrl: string = '';

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      text: ['', Validators.required],
      mediaUrl: ['', [Validators.required]]
    });
  }

  onSubmit() {debugger    
    if (this.dataForm.valid) {
      const formData = {
        text:this.dataForm.value.text,
        mediaUrl:this.imageUrl
      }
      
      // Call the API with form data
      this.sharedService.createQuote(formData).subscribe(
        (response) => {
          console.log('API Response:', response);
          alert('Quote created successfully!');
          this.dataForm.reset();  // Reset form after successful submission
          this.route.navigate(['/dash']);
        },
        (error) => {
          console.error('API Error:', error);
          alert('Failed to create quote. Please try again.');
        }
      );
    } else{
      alert('Both fields are required')
    }
  }

  navigateToDashboard() {
    this.route.navigate(['/dash']);
  }

  openFileToSaveImage(event) {
    debugger
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let formData = new FormData();
          formData.append("file", file, file.name);
          this.sharedService.createImageUrl(formData).subscribe((res) => {
            this.imageUrl = res[0].url;
          })
        }
      } else{
        alert('image type should be jpeg/png');
      }
    }
  };

  close(){
    this.route.navigate['/dash'];
  }
}
