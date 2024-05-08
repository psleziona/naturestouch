import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/images';

  constructor(private http: HttpClient) { }

  uploadImage(image: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/upload`, image,
      {responseType: "text"});
  }

  downloadImage(fileName: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${fileName}`, {
      responseType: 'blob' as 'json'
    });
  }
}
