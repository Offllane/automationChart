import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-avatar-cloudinary',
  templateUrl: './avatar-cloudinary.component.html',
  styleUrls: ['./avatar-cloudinary.component.scss']
})
export class AvatarCloudinaryComponent implements OnInit {
  public isImageLoading = false;

  @Input() width: string = '200px'
  @Input() height: string = '200px'
  @Input() cardInformId: number = 0;
  @Input() avatarPhotoLink: string = '';
  @Input() isActionsNeeded = true;
  @Output() avatarPhotoLinkChanged: EventEmitter<string | null> = new EventEmitter<string | null>();


  constructor(
    private resourceService: ResourceService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  onImageChanged(event: any): void {
    const file: File = event.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'offllane');
    data.append('public_id', 'personCard' + this.cardInformId+ '__' + Date.now());

    this.isImageLoading = true;
    this.resourceService.uploadImage(data).subscribe((data: any) => {
      this.avatarPhotoLinkChanged.next(data.secure_url);
      this.isImageLoading = false;
    }, error => {
      console.log(error);
      this.isImageLoading = false;
    })
  }

  deleteImage(): void {
    this.avatarPhotoLinkChanged.next(null);
  }
}
