// import { Injectable } from '@angular/core';
// import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable, deleteObject} from '@angular/fire/storage';
// @Injectable({
//   providedIn: 'root'
// })
// export class ImageService {
//   public uploadPercent = 0
//   constructor(private storage: Storage) {}
//   async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
//     const path = `${folder}/${name}`;
//     let url = '';
//     if (file) {
//       try {
//         const storadgeRef = ref(this.storage, path);
//         const task = uploadBytesResumable(storadgeRef, file);
//         percentage(task).subscribe(data => {
//           this.uploadPercent = data.progress
//         })
//         await task;
//         url = await getDownloadURL(storadgeRef);
//         return Promise.resolve(url)
//       } catch (e: any) {
//         console.error(e);
//       }
//     } else {
//       console.log('Wrong format');
//     }
//     return Promise.resolve(url)
//   }
//   deleteUploadFile(imagePath: string): Promise<void> {
//     const task = ref(this.storage, imagePath);
//     return deleteObject(task)
//   }
// }
//

import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public uploadPercent = 0;

  constructor(private storage: Storage) {
    // Лог ініціалізації Storage
    console.log('Storage instance in ImageService:', this.storage);

    if (!this.storage) {
      console.error('Storage is not initialized in ImageService!');
    }
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    console.log('Upload file called with:', { folder, name, file });

    if (file) {
      try {
        const storadgeRef = ref(this.storage, path);
        console.log('Storage reference created:', storadgeRef);

        const task = uploadBytesResumable(storadgeRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress;
          console.log('Upload progress:', data.progress);
        });

        await task;
        url = await getDownloadURL(storadgeRef);
        console.log('File uploaded successfully, URL:', url);

        return Promise.resolve(url);
      } catch (e: any) {
        console.error('Error during file upload:', e);
      }
    } else {
      console.warn('File is null or invalid format.');
    }

    return Promise.resolve(url);
  }

  deleteUploadFile(imagePath: string): Promise<void> {
    console.log('Deleting file at path:', imagePath);
    const task = ref(this.storage, imagePath);

    return deleteObject(task)
      .then(() => console.log('File deleted successfully.'))
      .catch((e) => console.error('Error deleting file:', e));
  }
}

