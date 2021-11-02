namespace RoombAPI.Core
{
  using System.Collections.Generic;
  using System.Linq;
  using Create2.Music;
  using Create2.Schedule;
  using RoombAPI.Models;

  public class RoombaState
  {
    public List<DayTime> Schedule { get; set; } = new();
    
    public List<Song> Songs { get; set; } = new();

    public void SetSchedule(params DayTime[] schedule)
    {
      foreach (var dayTime in schedule)
      {
        if (this.Schedule.Any(d => d.Day == dayTime.Day))
        {
          var oldSchedule = this.Schedule.Single(d => d.Day == dayTime.Day);
          this.Schedule.Remove(oldSchedule);
        }
        this.Schedule.Add(dayTime);
      }
    }
    
    public void SetSong(SongIndex index, Note[] notes)
    {
      var song = this.Songs.SingleOrDefault(s => s.Index == index);
      if (song == null)
      {
        song = new Song {Index = index};
        this.Songs.Add(song);
      }

      song.Notes = notes;
    }

    public void SaveChanges()
    {
      throw new System.NotImplementedException();
    }
  }
}