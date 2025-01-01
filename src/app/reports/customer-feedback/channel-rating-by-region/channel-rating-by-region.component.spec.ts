import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelRatingByRegionComponent } from './channel-rating-by-region.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ChannelRatingByRegionComponent', () => {
  let component: ChannelRatingByRegionComponent;
  let fixture: ComponentFixture<ChannelRatingByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChannelRatingByRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelRatingByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test to display the title
  it('should display the title "Channel Rating by Region"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Channel Rating by Region');
  });

  //test to initialize the region with null
  it('should initialize the regionForm with a null value', () => {
    const regionControl = component.regionForm.controls['region'];
    expect(regionControl.value).toBeNull();
    expect(regionControl.valid).toBeFalse();
  });

  //test to not submit if missing region
  it('should not submit the form if no region is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');
    submitButton.click();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.regionForm.valid).toBeFalse();
  });
});
