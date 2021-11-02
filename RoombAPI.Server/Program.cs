namespace RoombAPI.Server
{
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using RoombAPI.Extensions;
    using RoombaPi.Grpc;
    using RoombAPI.Server.Configuration;
    using RoombaPi.Server.Services;

    class Program
    {
        public static void Main(string[] args)
        {
            Program.CreateWebHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateWebHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging(builder => builder.SetMinimumLevel(LogLevel.Debug).AddLog4Net())
                .ConfigureServices((ctx, services) =>
                {
                    services.Configure<GrpcServerOptions>(ctx.Configuration.GetSection("GrpcServer"));
                    services.AddRoombAPI(ctx.Configuration.GetSection("Roomba"));
                    
                    Program.AddGrpcServices(services);
                    
                    services.AddHostedService<RoombAPIServer>();
                })
                .UseConsoleLifetime();

        private static void AddGrpcServices(IServiceCollection services)
        {
            services.AddTransient<BatteryService>();
            services.AddTransient(x => Battery.BindService(x.GetRequiredService<BatteryService>()));
                    
            services.AddTransient<BumperService>();
            services.AddTransient(x => Bumper.BindService(x.GetRequiredService<BumperService>()));
                    
            services.AddTransient<CleanerService>();
            services.AddTransient(x => Cleaner.BindService(x.GetRequiredService<CleanerService>()));
                    
            services.AddTransient<CliffService>();
            services.AddTransient(x => Cliff.BindService(x.GetRequiredService<CliffService>()));
                    
            services.AddTransient<DeviceService>();
            services.AddTransient(x => Device.BindService(x.GetRequiredService<DeviceService>()));
                    
            services.AddTransient<DriverService>();
            services.AddTransient(x => Driver.BindService(x.GetRequiredService<DriverService>()));
                    
            services.AddTransient<LedService>();
            services.AddTransient(x => Led.BindService(x.GetRequiredService<LedService>()));
                    
            services.AddTransient<MusicComposerService>();
            services.AddTransient(x => MusicComposer.BindService(x.GetRequiredService<MusicComposerService>()));
                    
            services.AddTransient<SchedulerService>();
            services.AddTransient(x => Scheduler.BindService(x.GetRequiredService<SchedulerService>()));
        }
    }
}