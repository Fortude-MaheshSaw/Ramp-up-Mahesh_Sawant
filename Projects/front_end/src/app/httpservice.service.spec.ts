import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpService } from './httpservice.service';


describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('remove all', () => {
    service.removeAll();
    expect(service.removeAll).toBeTruthy();
  });
});
