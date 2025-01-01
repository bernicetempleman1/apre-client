import { ChangeDetectorRef, AfterViewInit, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-channel-rating-by-region',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChartComponent],
  template: `
    <h1>Channel Rating by Region</h1>

    <div class="region-container">
      <form class="form" [formGroup]="regionForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="region">Region</label>
          <select class="select" formControlName="region" id="region" name="region">
            @for(region of regions; track region) {
              <option value="{{ region }}">{{ region }}</option>
            }
          </select>
        </div>
        <div class="form__actions">
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

        @if (channels.length && ratingAvg.length) {
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'Channel Rating by Region'"
            [data]="ratingAvg"
            [labels]="channels">
          </app-chart>
        </div>
        }
      </div>
  
  `,
  styles: `
     .region-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 50%;
      margin: 20px 0;
    }
  `,
})
export class ChannelRatingByRegionComponent {
  channels: string[] = [];
  ratingAvg: number[] = [];
  errorMessage: string = "";

  regions: string[] = [];

  regionForm = this.fb.group({
    region: [null, Validators.compose([Validators.required])]
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    this.http.get(`${environment.apiBaseUrl}/reports/customer-feedback/regions`).subscribe({
      next: (data: any) => {
        this.regions = data;
      },
      error: (err) => {
        console.error('Error fetching regions:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    // No need to create chart here, it will be handled by ChartComponent
  }

  onSubmit() {
    const region = this.regionForm.controls['region'].value;
    this.http.get(`${environment.apiBaseUrl}/reports/customer-feedback/regions/${region}`).subscribe({
      next: (data: any) => {
        this.channels = data.map((s: any) => s.channels);
        this.ratingAvg = data.map((s: any) => s.ratingAvg);

        console.log('channels', this.channels);
        console.log('ratingAvg', this.ratingAvg);

        // Trigger change detection
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching channel data:', err);
      }
    });
  }
}
