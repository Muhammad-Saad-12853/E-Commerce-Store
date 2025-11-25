import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toprated } from './toprated';

describe('Toprated', () => {
  let component: Toprated;
  let fixture: ComponentFixture<Toprated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toprated]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toprated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
