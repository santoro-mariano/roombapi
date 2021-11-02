namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.Cleaning;
  using Create2.Motors;
  using Create2.Sensors.Cleaner;
  using Create2.Sensors.Motor;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;
  using Cleaner = RoombaPi.Grpc.Cleaner;

  public class CleanerService : Cleaner.CleanerBase
  {
    private readonly ICleaner cleaner;
    private readonly IMotorsManager motorsManager;
    private readonly IMotorSensor motorSensor;
    private readonly ICleanerSensor cleanerSensor;

    public CleanerService(ICleaner cleaner,
                          IMotorsManager motorsManager,
                          IMotorSensor motorSensor,
                          ICleanerSensor cleanerSensor)
    {
      this.cleaner = cleaner;
      this.motorsManager = motorsManager;
      this.motorSensor = motorSensor;
      this.cleanerSensor = cleanerSensor;
    }

    public override async Task<Empty> Clean(CleanRequest request, ServerCallContext context)
    {
      await this.cleaner.Clean((CleanMode) request.Type);
      return new Empty();
    }

    public override async Task<GetMainBrushInfoResponse> GetMainBrushInfo(Empty request, ServerCallContext context)
    {
      var overCurrents = await this.motorSensor.GetMotorOverCurrents();
      return new GetMainBrushInfoResponse
      {
        Current = await this.motorSensor.GetMainBrushMotorCurrent(),
        Overcurrent = (overCurrents & MotorOverCurrents.MainBrush) == MotorOverCurrents.MainBrush
      };
    }

    public override async Task<GetSideBrushInfoResponse> GetSideBrushInfo(Empty request, ServerCallContext context)
    {
      var overCurrents = await this.motorSensor.GetMotorOverCurrents();
      return new GetSideBrushInfoResponse
      {
        Current = await this.motorSensor.GetSideBrushMotorCurrent(),
        Overcurrent = (overCurrents & MotorOverCurrents.SideBrush) == MotorOverCurrents.SideBrush
      };
    }

    public override async Task<DirtSensorResponse> ReadDirtSensor(Empty request, ServerCallContext context)
    {
      return new DirtSensorResponse
      {
        Value = await this.cleanerSensor.GetDirtDetect()
      };
    }

    public override async Task<Empty> StartMainBrush(StartMainBrushInfoRequest request, ServerCallContext context)
    {
      await this.motorsManager.SetMainBrush(true, !request.Inverse);
      return new Empty();
    }

    public override async Task<Empty> StartSideBrush(StartSideBrushRequest request, ServerCallContext context)
    {
      await this.motorsManager.SetSideBrush(true, !request.Inverse);
      return new Empty();
    }

    public override async Task<Empty> StartVacuum(Empty request, ServerCallContext context)
    {
      await this.motorsManager.SetVacuum(true);
      return new Empty();
    }

    public override async Task<Empty> StopMainBrush(Empty request, ServerCallContext context)
    {
      await this.motorsManager.SetMainBrush(false);
      return new Empty();
    }

    public override async Task<Empty> StopSideBrush(Empty request, ServerCallContext context)
    {
      await this.motorsManager.SetSideBrush(false);
      return new Empty();
    }

    public override async Task<Empty> StopVacuum(Empty request, ServerCallContext context)
    {
      await this.motorsManager.SetVacuum(false);
      return new Empty();
    }
  }
}