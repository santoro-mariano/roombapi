namespace RoombAPI.Core
{
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Create2.Device;
  using Microsoft.Extensions.Logging;
  using Microsoft.Extensions.Options;
  using RoombAPI.Configuration;
  using Unosquare.RaspberryIO;
  using Unosquare.RaspberryIO.Abstractions;
  using Unosquare.WiringPi;

  public class Roomba : IRoomba
  {
    private readonly IRobot robot;
    private readonly RoombAPISettings settings;
    private readonly ILogger<Roomba> logger;
    private IGpioPin wakeUpPin;
    private readonly IEnumerable<IRoombaComponent> components;

    public Roomba(IRobot robot,
                  IOptionsSnapshot<RoombAPISettings> settings,
                  ILogger<Roomba> logger,
                  IEnumerable<IRoombaComponent> components)
    {
      this.robot = robot;
      this.settings = settings.Value;
      this.logger = logger;
      this.components = components;
    }

    public async Task Init()
    {
      this.logger.LogInformation("Initializing Roomba");
      Pi.Init<BootstrapWiringPi>();
      this.wakeUpPin = this.ConfigureWakeUpPin(this.settings.WakeUpPin);
      await this.WakeUp();
      await this.robot.Reset();
      await this.robot.Start();
      foreach (var component in this.components)
      {
        await component.Init();
      }
    }

    public Task WakeUp()
    {
      return Task.Run(() =>
      {
        this.logger.LogInformation("Waking up Roomba");
        this.wakeUpPin.Write(GpioPinValue.Low);
        Task.Delay(500);
        this.wakeUpPin.Write(GpioPinValue.High);
        Task.Delay(1500);
      });
    }

    public void Dispose()
    {
      this.robot.Stop();
    }

    private IGpioPin ConfigureWakeUpPin(P1 wakeUpPin)
    {
      this.logger.LogInformation($"Setting wake up pin: {wakeUpPin}");
      var pin = Pi.Gpio[wakeUpPin];
      pin.PinMode = GpioPinDriveMode.Output;
      return pin;
    }
  }
}