import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ByPublicIdentifierTagDto, Picture } from '../../../shared/interfaces/dtos/pet/by-public-identifier-tag/by-public-identifier-tag-dto.interface';
import { PetsService } from '../shared/data-access/pets.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [ DatePipe],
  templateUrl: './pet-detail.component.html',
  styles: ``
})
export default class PetDetailComponent {

  petId: string | null = null;
  petData: ByPublicIdentifierTagDto | null = null;
  currentPhotoIndex: number = 0;
  currentPhoto: Picture | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private petService: PetsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.petId = params.get('id');

      if (this.petId) {
        this.petService.getByPublicIdentifier(this.petId)
          .subscribe({
            next: (response: ByPublicIdentifierTagDto) => {
              this.petData = response;
              console.log({'petData': this.petData})
              this.loading = false;
              if (this.petData?.data?.pictures && this.petData.data.pictures.length > 0) {
                this.currentPhotoIndex = 0;
                this.currentPhoto = this.petData.data.pictures[this.currentPhotoIndex];
              }
            },
            error: (error: ByPublicIdentifierTagDto) => {
              console.log({'error': error})
              console.log({'httpStatusCode': error.httpStatusCode})
              this.errorMessage = 'Error al cargar los datos.';
              this.loading = false;
            }
          });
      } else {
        this.errorMessage = 'No se proporcionó el identificador del producto.';
        this.loading = false;
      }
    });
  }

  prevPhoto() {
    if (!this.petData?.data?.pictures) return;

    this.currentPhotoIndex =
      (this.currentPhotoIndex - 1 + this.petData.data.pictures.length) % this.petData.data.pictures.length;
    this.currentPhoto = this.petData.data.pictures[this.currentPhotoIndex];
  }

  nextPhoto() {
    if (!this.petData?.data?.pictures) return;

    this.currentPhotoIndex =
      (this.currentPhotoIndex + 1) % this.petData.data.pictures.length;
    this.currentPhoto = this.petData.data.pictures[this.currentPhotoIndex];
  }

  getAgeFromBirthdate(utcDate: string): number {
    const birthDate = new Date(utcDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }

}
