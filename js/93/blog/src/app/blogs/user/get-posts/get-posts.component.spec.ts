import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPostsComponent } from './get-posts.component';

describe('GetPostsComponent', () => {
  let component: GetPostsComponent;
  let fixture: ComponentFixture<GetPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
