import {ElementRef, Inject, Injectable, ViewChild} from '@angular/core';
// @ts-ignore
import domtoimage from 'dom-to-image';
import {DOCUMENT} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class CreateImageService{

  @ViewChild('chartRoot') chartRootElement: ElementRef | undefined;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  createImage(): void {
    const chartRootNode = this.document.getElementById('chartRoot') as HTMLElement;


    let scale = 5;
    domtoimage.toJpeg(chartRootNode,
      {
        bgcolor: 'white',
        width: chartRootNode.scrollWidth * scale,
        height: chartRootNode.scrollHeight * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left'
        }
      }).then((dataUrl: string) => {
      let img = new Image();
      img.src = dataUrl;
      img.width = 200;
      let link = document.createElement('a');
      link.download = 'Схема-OneLine-горизонтальная.jpg';
      link.href = dataUrl;
      link.click();
    }).catch((error: any) => {
      console.log('ooops', error);
    })

    domtoimage.toBlob(chartRootNode, {
      width: chartRootNode.clientWidth * scale,
      height: chartRootNode.clientHeight * scale,
      style: {
        transform: 'scale('+scale+')',
        transformOrigin: 'top left'
      }
    })
  }

  saveImage(dataUrl: string): void {
    let save = document.createElement('a');
    save.href = dataUrl;
    save.target = '_blank';
    save.download = 'photo.jpg'

    let event = document.createEvent('Event');
    event.initEvent('click', true, true);
    save.dispatchEvent(event);
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
  }
}
