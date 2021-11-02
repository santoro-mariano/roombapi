namespace RoombAPI.Core
{
  using System;
  using System.Threading.Tasks;
  using Create2.Configuration;
  using Create2.OI;
  using Microsoft.Extensions.Logging;
  using Microsoft.Extensions.Options;

  public class RetryStrategy: DefaultRetryStrategy
  {
    private readonly IRoomba roomba;

    public RetryStrategy(ILogger<RetryStrategy> logger,
                         IOptionsMonitor<RetryStrategySettings> settings,
                         IRoomba roomba) : base(logger, settings)
    {
      this.roomba = roomba;
    }

    public override async Task OnFail(RetryAttempt retryAttempt, Exception exception = null)
    {
      await base.OnFail(retryAttempt, exception);
      await this.roomba.WakeUp();
    }
  }
}