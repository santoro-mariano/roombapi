import { WeekDay } from './weekDay';

export class ScheduleDay {
  constructor(public day: WeekDay,
              public hour: number,
              public minute: number) {
  }
}
