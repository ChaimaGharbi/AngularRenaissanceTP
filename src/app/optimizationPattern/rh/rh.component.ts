import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
} from "@angular/core";
import { User, UsersService } from "../users.service";
import * as ChartJs from "chart.js/auto";

@Component({
  selector: "app-rh",
  templateUrl: "./rh.component.html",
  styleUrls: ["./rh.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RhComponent implements OnInit {
  oddUsers: User[];
  evenUsers: User[];
  chart: unknown;

  constructor(private userService: UsersService, private ngZone: NgZone) {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }

  ngOnInit(): void {
    this.createChart();
  }

  addUser(list: User[], newUser: string) {
    this.userService.addUser(list, newUser);
  }

  createChart() {
    this.ngZone.runOutsideAngular(() => {
      const data = [
        { users: "Workers", count: this.oddUsers.length },
        { users: "Boss", count: this.evenUsers.length },
      ];

      const chart = new ChartJs.Chart("MyChart", {
        type: "bar",
        data: {
          labels: data.map((row) => row.users),
          datasets: [
            {
              label: "Entreprise stats",
              data: data.map((row) => row.count),
            },
          ],
        },
      });

      this.ngZone.run(() => {
        this.chart = chart;
      });
    });
  }
}
