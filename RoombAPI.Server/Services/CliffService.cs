namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.Sensors.Environment;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;

  public class CliffService : Cliff.CliffBase
  {
    private readonly IEnvironmentSensor environmentSensor;
    
    public CliffService(IEnvironmentSensor environmentSensor)
    {
      this.environmentSensor = environmentSensor;
    }
    
    public override async Task<CliffSensorsStatusResponse> GetCliffSensorsStatus(Empty request, ServerCallContext context)
    {
      var response = new CliffSensorsStatusResponse();
      
      response.Left = new CliffSensorInfo
      {
        Active = await this.environmentSensor.GetCliffLeft(),
        Signal = await this.environmentSensor.GetCliffLeftSignal()
      };
      
      response.FrontLeft = new CliffSensorInfo
      {
        Active = await this.environmentSensor.GetCliffFrontLeft(),
        Signal = await this.environmentSensor.GetCliffFrontLeftSignal()
      };
      
      response.Right = new CliffSensorInfo
      {
        Active = await this.environmentSensor.GetCliffRight(),
        Signal = await this.environmentSensor.GetCliffRightSignal()
      };
      
      response.FrontRight = new CliffSensorInfo
      {
        Active = await this.environmentSensor.GetCliffFrontRight(),
        Signal = await this.environmentSensor.GetCliffFrontRightSignal()
      };

      return response;
    }
  }
}