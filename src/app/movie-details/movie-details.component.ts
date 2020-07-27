import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie;
  rateHovered = 0;

  constructor() {}

  ngOnInit(): void {}

  rateHover(rate): void {
    this.rateHovered = rate;
  }

  rateClicked(rate): void {
    this.rateClicked = rate;
  }

}
