import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CallDurationByMonthComponent } from './call-duration-by-month.component';

// Call duration by month tests
describe('CallDurationByMonthComponent', () => {
  let component: CallDurationByMonthComponent;
  let fixture: ComponentFixture<CallDurationByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CallDurationByMonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallDurationByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // component should be created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Component should display the title
  it('should display the title "Call Duration by Month"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Call Duration by Month');
  });

  // the form shuld be initialized with a null value for month
  it('should initialize the monthForm with a null value for month', () => {
    const monthControl = component.monthForm.controls['month'];
    expect(monthControl.value).toBeNull();
    expect(monthControl.valid).toBeFalse();
  });

  // the form can not be submitted without a selected month
  it('should not submit the form if no month is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.monthForm.valid).toBeFalse();
  });
});