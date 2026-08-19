import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-7xl mx-auto text-slate-100">
      <h1 class="text-3xl font-bold tracking-tight mb-2">
        Task Management Dashboard
      </h1>
      <p class="text-slate-400 mb-6">Welcome to your full-stack task system.</p>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          class="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg"
        >
          <h3 class="text-sm font-medium text-slate-400">New Tasks</h3>
          <p class="text-3xl font-bold mt-2 text-indigo-400">0</p>
        </div>
        <div
          class="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg"
        >
          <h3 class="text-sm font-medium text-slate-400">In Progress</h3>
          <p class="text-3xl font-bold mt-2 text-amber-400">0</p>
        </div>
        <div
          class="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg"
        >
          <h3 class="text-sm font-medium text-slate-400">Completed</h3>
          <p class="text-3xl font-bold mt-2 text-emerald-400">0</p>
        </div>
        <div
          class="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg"
        >
          <h3 class="text-sm font-medium text-slate-400">Overdue</h3>
          <p class="text-3xl font-bold mt-2 text-rose-400">0</p>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
