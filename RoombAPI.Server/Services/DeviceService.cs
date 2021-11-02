namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.Device;
  using Create2.Sensors.Buttons;
  using Create2.Sensors.OI;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;

  public class DeviceService : Device.DeviceBase
  {
    private readonly IButtonsSensor buttonsSensor;
    private readonly IOISensor oiSensor;
    private readonly IRobot robot;
    
    public DeviceService(IButtonsSensor buttonsSensor, IOISensor oiSensor, IRobot robot)
    {
      this.buttonsSensor = buttonsSensor;
      this.oiSensor = oiSensor;
      this.robot = robot;
    }
    
    public override async Task<ButtonPressStatusResponse> GetButtonPressStatus(Empty request, ServerCallContext context)
    {
      var buttonsStatus = await this.buttonsSensor.GetPressedButtons();
      return new ButtonPressStatusResponse
      {
        Clean = (buttonsStatus & PressedButtons.Clean) == PressedButtons.Clean,
        Clock = (buttonsStatus & PressedButtons.Clock) == PressedButtons.Clock,
        Day = (buttonsStatus & PressedButtons.Day) == PressedButtons.Day,
        Dock = (buttonsStatus & PressedButtons.Dock) == PressedButtons.Dock,
        Hour = (buttonsStatus & PressedButtons.Hour) == PressedButtons.Hour,
        Minute = (buttonsStatus & PressedButtons.Minute) == PressedButtons.Minute,
        Schedule = (buttonsStatus & PressedButtons.Schedule) == PressedButtons.Schedule,
        Spot = (buttonsStatus & PressedButtons.Spot) == PressedButtons.Spot
      };
    }

    public override Task<FirmwareInfoResponse> GetFirmwareInfo(Empty request, ServerCallContext context)
    {
      return base.GetFirmwareInfo(request, context);
    }

    public override async Task<GetModeResponse> GetMode(Empty request, ServerCallContext context)
    {
      return new GetModeResponse { Mode = (Mode) await this.oiSensor.GetOIMode() + 1 };
    }

    public override async Task<Empty> PowerDown(Empty request, ServerCallContext context)
    {
      await this.robot.Deactivate();
      return new Empty();
    }

    public override async Task<Empty> Reset(Empty request, ServerCallContext context)
    {
      await this.robot.Reset();
      return new Empty();
    }

    public override async Task<Empty> Start(Empty request, ServerCallContext context)
    {
      await this.robot.Start();
      return new Empty();
    }

    public override async Task<Empty> Stop(Empty request, ServerCallContext context)
    {
      await this.robot.Stop();
      return new Empty();
    }
  }
}