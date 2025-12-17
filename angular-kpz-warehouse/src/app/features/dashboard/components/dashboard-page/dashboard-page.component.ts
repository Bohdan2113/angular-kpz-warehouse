import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardOverview } from '../../interfaces/dashboard-overview';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  overview$: Observable<DashboardOverview>;

  constructor(private dashboardService: DashboardService) {
    this.overview$ = this.dashboardService.getOverview();
  }
}
