namespace RoombAPI.Models
{
  using Create2.Music;

  public class Song
  {
    public SongIndex Index { get; set; }
    
    public Note[] Notes { get; set; }
  }
}