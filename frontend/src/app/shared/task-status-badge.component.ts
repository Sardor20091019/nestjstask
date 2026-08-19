import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TaskStatus } from "../core/models";

@Component({
  selector: "app-task-status-badge",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()">{{ label() }}</span>`,
})
export class TaskStatusBadgeComponent {
  readonly status = input.required<TaskStatus>();

  label = () =>
    ({
      CREATED: "New",
      IN_PROCESS: "In progress",
      IN_PROGRESS: "In progress",
      DONE: "Completed",
      COMPLETED: "Completed",
    })[this.status()];
  classes = () => {
    const base =
      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ";
    switch (this.status()) {
      case "DONE":
      case "COMPLETED":
        return (
          base +
          "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300"
        );
      case "IN_PROCESS":
      case "IN_PROGRESS":
        return (
          base + "bg-sky-500/10 text-sky-700 ring-sky-600/20 dark:text-sky-300"
        );
      default:
        return (
          base +
          "bg-violet-500/10 text-violet-700 ring-violet-600/20 dark:text-violet-300"
        );
    }
  };
}
