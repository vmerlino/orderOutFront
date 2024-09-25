import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-mesas',
  templateUrl: './ranking-mesas.component.html',
  styleUrls: ['./ranking-mesas.component.scss']
})
export class RankingMesasComponent implements OnInit {
  @Input() rankingTables: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
