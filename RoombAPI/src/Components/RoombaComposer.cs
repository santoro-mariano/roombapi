namespace RoombAPI.Components
{
  using System.Threading.Tasks;
  using Create2.Music;
  using RoombAPI.Core;

  public class RoombaComposer : IComposer, IRoombaComponent
  {
    private readonly RoombaState state;
    private readonly Composer composer;

    public RoombaComposer(RoombaState state, Composer composer)
    {
      this.state = state;
      this.composer = composer;
    }

    public async Task Init()
    {
      foreach (var song in this.state.Songs)
      {
        await this.SetSong(song.Index, song.Notes);
      }
    }

    public async Task SetSong(SongIndex index, params Note[] notes)
    {
      await this.composer.SetSong(index, notes);
      this.state.SetSong(index, notes);
      this.state.SaveChanges();
    }

    public Task PlaySong(SongIndex index)
    {
      return this.composer.PlaySong(index);
    }
  }
}