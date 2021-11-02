namespace RoombAPI.Components
{
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Create2.Schedule;
  using RoombAPI.Core;

  public class RoombaScheduler: IScheduler, IRoombaComponent
  {
    private readonly RoombaState state;
    private readonly Scheduler scheduler;
    
    public RoombaScheduler(RoombaState state, Scheduler scheduler)
    {
      this.state = state;
      this.scheduler = scheduler;
    }

    public async Task Init()
    {
      await this.SetClock(DateTime.Now);
      await this.SetSchedule(this.state.Schedule.ToArray());
    }

    public async Task ClearSchedule()
    {
      await this.scheduler.ClearSchedule();
      this.state.Schedule.Clear();
      this.state.SaveChanges();
    }

    public Task SetClock(DayTime dayTime)
    {
      return this.scheduler.SetClock(dayTime);
    }

    public async Task SetSchedule(params DayTime[] schedules)
    {
      await this.scheduler.SetSchedule(schedules);
      this.state.SetSchedule(schedules);
    }

    public IReadOnlyList<DayTime> GetSchedule()
    {
      return this.state.Schedule;
    }

    public DayTime GetClockTime()
    {
      return DateTime.Now;
    }
  }
}