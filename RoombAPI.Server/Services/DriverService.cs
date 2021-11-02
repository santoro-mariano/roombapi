namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.Cleaning;
  using Create2.Driving;
  using Create2.Sensors.Driver;
  using Create2.Sensors.Motor;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;
  using Driver = RoombaPi.Grpc.Driver;

  public class DriverService : Driver.DriverBase
  {
    private readonly IDriver driver;
    private readonly ICleaner cleaner;
    private readonly DriverSensor driverSensor;
    private readonly MotorSensor motorSensor;

    public DriverService(IDriver driver, ICleaner cleaner, DriverSensor driverSensor, MotorSensor motorSensor)
    {
      this.driver = driver;
      this.cleaner = cleaner;
      this.driverSensor = driverSensor;
      this.motorSensor = motorSensor;
    }
    
    public override async Task<Empty> Drive(DriveRequest request, ServerCallContext context)
    {
      await this.driver.Drive((short)request.Velocity, (short)request.Radius);
      return new Empty();
    }

    public override async Task<Empty> DriveDirect(DriveDirectRequest request, ServerCallContext context)
    {
      await this.driver.DriveDirect((short) request.LeftVelocity, (short) request.RightVelocity);
      return new Empty();
    }

    public override async Task<Empty> DrivePWM(DrivePWMRequest request, ServerCallContext context)
    {
      await this.driver.DrivePwm((short) request.LeftPwm, (short) request.RightPwm);
      return new Empty();
    }

    public override async Task<Empty> DriveStraight(DriveStraightRequest request, ServerCallContext context)
    {
      await this.driver.Drive((short) request.Velocity, 0);
      return new Empty();
    }

    public override async Task<AngleResponse> GetAngle(Empty request, ServerCallContext context)
    {
      return new AngleResponse { Angle = await this.driverSensor.GetAngle() };
    }

    public override async Task<DistanceResponse> GetDistance(Empty request, ServerCallContext context)
    {
      return new DistanceResponse { Distance = await this.driverSensor.GetDistance() };
    }

    public override async Task<RequestedValuesResponse> GetRequestedValues(Empty request, ServerCallContext context)
    {
      return new RequestedValuesResponse
      {
        Radius = await this.driverSensor.LastRequestedRadius(),
        Velocity = await this.driverSensor.LastRequestedVelocity(),
        LeftVelocity = await this.driverSensor.LastRequestedLeftWheelVelocity(),
        RightVelocity = await this.driverSensor.LastRequestedRightWheelVelocity()
      };
    }

    public override async Task<WheelsInfoResponse> GetWheelsInfo(Empty request, ServerCallContext context)
    {
      var overCurrents = await this.motorSensor.GetMotorOverCurrents();
      var stasis = await this.driverSensor.GetStasis();
      return new WheelsInfoResponse
      {
        LeftWheel = new SideWheelInfo
        {
          Current = await this.motorSensor.GetLeftMotorCurrent(),
          Overcurrent = (overCurrents & MotorOverCurrents.LeftWheel) == MotorOverCurrents.LeftWheel
        },
        RightWheel = new SideWheelInfo
        {
          Current = await this.motorSensor.GetRightMotorCurrent(),
          Overcurrent = (overCurrents & MotorOverCurrents.RightWheel) == MotorOverCurrents.RightWheel
        },
        StasisStatus = new StasisStatus
        {
          ErrorSensor = (stasis & Stasis.Disabling) == Stasis.Disabling,
          MovingForward = (stasis & Stasis.Toggling) == Stasis.Toggling
        }
      };
    }

    public override async Task<Empty> SeekDock(Empty request, ServerCallContext context)
    {
      await this.cleaner.SeekDock();
      return new Empty();
    }
  }
}