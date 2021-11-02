namespace RoombaPi.Server.Services
{
  using System.Threading.Tasks;
  using global::Grpc.Core;
  using Google.Protobuf.WellKnownTypes;
  using RoombAPI.Components;
  using RoombaPi.Grpc;

  public class MusicComposerService : MusicComposer.MusicComposerBase
  {
    private readonly RoombaScheduler composer;
    
    public MusicComposerService(RoombaScheduler composer)
    {
      this.composer = composer;
    }
    
    public override Task<SelectedSongResponse> GetSelectedSong(Empty request, ServerCallContext context)
    {
      return base.GetSelectedSong(request, context);
    }

    public override Task<GetSongResponse> GetSong(GetSongRequest request, ServerCallContext context)
    {
      return base.GetSong(request, context);
    }

    public override Task<IsSongPlayingResponse> IsSongPlaying(Empty request, ServerCallContext context)
    {
      return base.IsSongPlaying(request, context);
    }

    public override Task<Empty> PlaySong(PlaySongRequest request, ServerCallContext context)
    {
      
      return base.PlaySong(request, context);
    }

    public override Task<Empty> SetSong(SetSongRequest request, ServerCallContext context)
    {
      return base.SetSong(request, context);
    }
  }
}