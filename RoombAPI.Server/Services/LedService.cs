namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.UI;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;

  public class LedService : Led.LedBase
  {
    private readonly ILedsManager ledsManager;
    
    public LedService(ILedsManager ledsManager)
    {
      this.ledsManager = ledsManager;
    }
    
    public override async Task<Empty> SetAscii(SetAsciiRequest request, ServerCallContext context)
    {
      var msg = $"{request.Char1}{request.Char2}{request.Char3}{request.Char4}";
      await this.ledsManager.SetDigitLed(msg);
      return new Empty();
    }

    public override async Task<Empty> SetCheckRobot(SetLedRequest request, ServerCallContext context)
    {
      await this.ledsManager.SetCheckRobot(request.Status);
      return new Empty();
    }

    public override async Task<Empty> SetDebris(SetLedRequest request, ServerCallContext context)
    {
      await this.ledsManager.SetDebris(request.Status);
      return new Empty();
    }

    public override async Task<Empty> SetDock(SetLedRequest request, ServerCallContext context)
    {
      await this.ledsManager.SetDock(request.Status);
      return new Empty();
    }

    public override async Task<Empty> SetPower(SetPowerLedRequest request, ServerCallContext context)
    {
      await this.ledsManager.SetPower((byte) request.Color, (byte) request.Intensity);
      return new Empty();
    }

    public override Task<Empty> SetScheduling(SetSchedulingRequest request, ServerCallContext context)
    {
      return base.SetScheduling(request, context);
    }

    public override async Task<Empty> SetSpot(SetLedRequest request, ServerCallContext context)
    {
      await this.ledsManager.SetSpot(request.Status);
      return new Empty();
    }
  }
}