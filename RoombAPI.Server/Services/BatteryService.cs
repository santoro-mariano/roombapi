namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using Create2.Sensors.Battery;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombaPi.Grpc;
  using ChargingState = RoombaPi.Grpc.ChargingState;

  public class BatteryService : Battery.BatteryBase
  {
    private readonly IBatterySensor batterySensor;

    public BatteryService(IBatterySensor batterySensor)
    {
      this.batterySensor = batterySensor;
    }

    public override async Task<BatteryInfoResponse> GetBatteryInfo(Empty request, ServerCallContext context)
    {
      return new BatteryInfoResponse
      {
        Capacity = await this.batterySensor.GetCapacity(),
        Charge = await this.batterySensor.GetCharge(),
        Current = await this.batterySensor.GetCurrent(),
        Temperature = await this.batterySensor.GetTemperature(),
        Voltage = await this.batterySensor.GetVoltage()
      };
    }

    public override async Task<ChargingSourcesAvailableResponse> GetChargingSourcesAvailable(Empty request,
      ServerCallContext context)
    {
      var chargingSourcesAvailable = await this.batterySensor.GetChargingSourcesAvailable();
      var response = new ChargingSourcesAvailableResponse
      {
        HomeBase = (chargingSourcesAvailable & ChargingSources.HomeBase) == ChargingSources.HomeBase,
        InternalCharger = (chargingSourcesAvailable & ChargingSources.InternalCharger) ==
                          ChargingSources.InternalCharger
      };
      return response;
    }

    public override async Task<ChargingStateResponse> GetChargingState(Empty request, ServerCallContext context)
    {
      var chargingState = await this.batterySensor.GetChargingState();
      return new ChargingStateResponse
      {
        State = (ChargingState) chargingState + 1
      };
    }
  }
}