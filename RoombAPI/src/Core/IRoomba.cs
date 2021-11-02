namespace RoombAPI.Core
{
  using System;
  using System.Threading.Tasks;

  public interface IRoomba: IDisposable
  {
    Task Init();

    Task WakeUp();
  }
}