import { Component, OnInit } from '@angular/core';
import { setOptions, MbscEventcalendarView, MbscCalendarEvent , localeEs } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';

setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light',
  clickToCreate: false,
  dragToCreate: false,
  dragToMove: false,
  dragToResize: false
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  myEvents: MbscCalendarEvent[] = [];
  view = 'month';
  calView: MbscEventcalendarView = {
    calendar: { type: 'month' },
    agenda: { type: 'month' }
  };

  ngOnInit(): void {
    this.http.jsonp < MbscCalendarEvent[] > ('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }

  changeView(): void {
    setTimeout(() => {
      switch (this.view) {
        case 'month':
          this.calView = {
            calendar: { type: 'month' },
            agenda: { type: 'month' }
          };
          break;
        case 'week':
          this.calView = {
            calendar: { type: 'week' },
            agenda: { type: 'week' }
          };
          break;
        case 'day':
          this.calView = {
            agenda: { type: 'day' }
          };
          break;
      }
    });
  }
}

