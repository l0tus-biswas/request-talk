import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgbbServiceService {
  private readonly apiKey : string = "47ba03fc6481072bfc9a580cce6297c0";

  constructor( private readonly httpClient: HttpClient) { }

  upload(file: any){
    const formData = new FormData();
    formData.append('image', file);

    return this.httpClient
    .post('/upload', formData, {params: {key: this.apiKey}})
  }

}
