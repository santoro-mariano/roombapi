namespace RoombAPI.Extensions
{
  using System;
  using Create2.Configuration;
  using Create2.Music;
  using Create2.OI;
  using Create2.Schedule;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  using RoombAPI.Components;
  using RoombAPI.Configuration;
  using RoombAPI.Core;

  public static class ServiceExtensions
  {
    public static IServiceCollection AddRoombAPI(this IServiceCollection services,
      Action<RoombAPISettings> roombaPiSettings,
      Action<OIDispatcherSettings> oiSettings)
    {
      return services
        .Configure(roombaPiSettings)
        .AddCreate2(oiSettings)
        .AddRoombAPI();
    }

    public static IServiceCollection AddRoombAPI(this IServiceCollection services, IConfiguration configurationSection)
    {
      return services
        .Configure<RoombAPISettings>(configurationSection)
        .AddCreate2(configurationSection)
        .AddRoombAPI();
    }

    private static IServiceCollection AddRoombAPI(this IServiceCollection services)
    {
      return services
        .AddSingleton<IRoombaComponent, RoombaComposer>().AddSingleton<IComposer, RoombaComposer>()
        .AddSingleton<IRoombaComponent, RoombaScheduler>().AddSingleton<IScheduler, RoombaScheduler>()
        .AddSingleton<RoombaState>()
        .AddSingleton<IRoomba, Roomba>()
        .AddSingleton<IRetryStrategy, RetryStrategy>();
    }
  }
}