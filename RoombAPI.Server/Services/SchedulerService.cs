namespace RoombaPi.Server.Services
{
  using System;
  using System.Linq;
  using System.Threading.Tasks;
  using Create2.Schedule;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombAPI.Components;
  using RoombaPi.Grpc;
  using Scheduler = RoombaPi.Grpc.Scheduler;

  public class SchedulerService : Scheduler.SchedulerBase
  {
    private readonly RoombaScheduler scheduler;

    public SchedulerService(RoombaScheduler scheduler)
    {
      this.scheduler = scheduler;
    }

    public override async Task<Empty> ClearSchedule(Empty request, ServerCallContext context)
    {
      await this.scheduler.ClearSchedule();
      return new Empty();
    }

    public override Task<GetClockResponse> GetClock(Empty request, ServerCallContext context)
    {
      var clockTime = this.scheduler.GetClockTime();
      return Task.FromResult(new GetClockResponse
      {
        Day = this.ConvertToGrpcWeekDay(clockTime.Day),
        Hour = clockTime.Hour,
        Minute = clockTime.Minute
      });
    }

    public override Task<GetScheduleResponse> GetSchedule(Empty request, ServerCallContext context)
    {
      var schedule = this.scheduler.GetSchedule().Select(s => new ScheduleDay
        { Day = this.ConvertToGrpcWeekDay(s.Day), Hour = s.Hour, Minute = s.Minute });
      return Task.FromResult(new GetScheduleResponse { Days = { schedule } });
    }

    public override async Task<Empty> SetSchedule(SetScheduleRequest request, ServerCallContext context)
    {
      await this.scheduler.SetSchedule(request.Days.Select(d => new DayTime
        {Day = this.ConvertToCreate2WeekDay(d.Day), Hour = (byte)d.Hour, Minute = (byte)d.Minute}).ToArray());
      return new Empty();
    }

    private WeekDay ConvertToGrpcWeekDay(WeekDays day)
    {
      switch (day)
      {
        case WeekDays.Sunday:
          return WeekDay.Sunday;
        case WeekDays.Monday:
          return WeekDay.Monday;
        case WeekDays.Tuesday:
          return WeekDay.Tuesday;
        case WeekDays.Wednesday:
          return WeekDay.Wednesday;
        case WeekDays.Thursday:
          return WeekDay.Thursday;
        case WeekDays.Friday:
          return WeekDay.Friday;
        case WeekDays.Saturday:
          return WeekDay.Saturday;
        default:
          throw new ArgumentOutOfRangeException(nameof(day), day, null);
      }
    }

    private WeekDays ConvertToCreate2WeekDay(WeekDay day)
    {
      return day switch
      {
        WeekDay.Sunday => WeekDays.Sunday,
        WeekDay.Monday => WeekDays.Monday,
        WeekDay.Tuesday => WeekDays.Tuesday,
        WeekDay.Wednesday => WeekDays.Wednesday,
        WeekDay.Thursday => WeekDays.Thursday,
        WeekDay.Friday => WeekDays.Friday,
        WeekDay.Saturday => WeekDays.Saturday,
        _ => throw new ArgumentOutOfRangeException(nameof(day), day, null)
      };
    }
  }
}