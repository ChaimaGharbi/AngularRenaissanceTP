import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { User } from "../users.service";

@Component({
  selector: "app-user-item",
  templateUrl: "./user-item.component.html",
  styleUrls: ["./user-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent {
  @Input({ required: true })
  user!: User;
}
