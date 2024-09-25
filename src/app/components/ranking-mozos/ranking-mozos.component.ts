import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-mozos',
  templateUrl: './ranking-mozos.component.html',
  styleUrls: ['./ranking-mozos.component.scss']
})
export class RankingMozosComponent implements OnInit {
  @Input() rankingWaiterDtos: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
