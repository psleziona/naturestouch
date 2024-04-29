import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/images';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.apiUrl}/upload`, formData);
  }

  downloadImage(fileName: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${fileName}`, {
      responseType: 'blob' as 'json'
    });
  }
}
