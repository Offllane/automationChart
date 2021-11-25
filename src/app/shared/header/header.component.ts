import {Component, Input, OnInit} from '@angular/core';
import {HomeService} from "../../home/home.service";
import {Switch, TreeType} from "../../models/types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public treeType: TreeType = 'horizontal';
  public bufferState: Switch = 'close';
  @Input() mode = 'home';

  constructor(
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    })
  }

  public switchTreeType(treeType: TreeType) {
    this.homeService.treeType.next(treeType);
  }

  public goToAddItemPage(): void {
    this.router.navigate(['/add-item']);
  }

  public goToMainPage(): void {
    this.router.navigate(['/home']);
  }

  public toggleBuffer(): void {
    this.bufferState = this.bufferState === 'open' ? 'close' : 'open';
    this.homeService.bufferState.next(this.bufferState);
  }
}
