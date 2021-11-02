namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.Sensors.Environment;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;

  public class BumperService : Bumper.BumperBase
  {
    private readonly IEnvironmentSensor environmentSensor;

    public BumperService(IEnvironmentSensor environmentSensor)
    {
      this.environmentSensor = environmentSensor;
    }

    public override async Task<BumpsStatusResponse> GetBumpsStatus(Empty request, ServerCallContext context)
    {
      var bumpsAndWheelDrops = await this.environmentSensor.GetBumpsAndWheelDrops();
      return new BumpsStatusResponse
      {
        Left = (bumpsAndWheelDrops & BumpsAndWheelDrops.BumpLeft) == BumpsAndWheelDrops.BumpLeft,
        Right = (bumpsAndWheelDrops & BumpsAndWheelDrops.BumpRight) == BumpsAndWheelDrops.BumpRight
      };
    }

    public override async Task<LightBumpersStatusResponse> GetLightBumpersStatus(Empty request,
      ServerCallContext context)
    {
      var lightBumperDetections = await this.environmentSensor.GetLightBumperDetections();
      var response = new LightBumpersStatusResponse();
      response.Left = new LightBumperInfo
      {
        Active = (lightBumperDetections & LightBumperDetections.Left) == LightBumperDetections.Left,
        Signal = await this.environmentSensor.GetLightBumpLeftSignal()
      };

      response.FrontLeft = new LightBumperInfo
      {
        Active = (lightBumperDetections & LightBumperDetections.FrontLeft) == LightBumperDetections.FrontLeft,
        Signal = await this.environmentSensor.GetLightBumpFrontLeftSignal()
      };

      response.CenterLeft = new LightBumperInfo
      {
        Active = (lightBumperDetections & LightBumperDetections.CenterLeft) == LightBumperDetections.CenterLeft,
        Signal = await this.environmentSensor.GetLightBumpCenterLeftSignal()
      };

      response.Right = new LightBumperInfo
      {
        Active = (lightBumperDetections & LightBumperDetections.Right) == LightBumperDetections.Right,
        Signal = await this.environmentSensor.GetLightBumpLeftSignal()
      };

      response.FrontRight = new LightBumperInfo
      {
        Active = (lightBumperDetections & LightBumperDetections.FrontRight) == LightBumperDetections.FrontRight,
        Signal = await this.environmentSensor.GetLightBumpFrontLeftSignal()
      };

      response.CenterRight = new LightBumperInfo
      {
        Active = (lightBumperDetections & LightBumperDetections.CenterRight) == LightBumperDetections.CenterRight,
        Signal = await this.environmentSensor.GetLightBumpCenterLeftSignal()
      };

      return response;
    }

    public override async Task<IsVirtualWallPresentResponse> IsVirtualWallPresent(Empty request,
      ServerCallContext context)
    {
      return new IsVirtualWallPresentResponse
      {
        VirtualWallPresent = await this.environmentSensor.GetVirtualWall()
      };
    }
  }
}