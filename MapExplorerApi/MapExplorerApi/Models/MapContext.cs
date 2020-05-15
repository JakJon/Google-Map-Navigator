using Microsoft.EntityFrameworkCore;

namespace MapExplorerApi.Models
{
    public class MapContext : DbContext
    {
        public MapContext(DbContextOptions<MapContext> options)
            :base(options)
        {
        }

        public DbSet<LatLong> LatLongs { get; set; }
    }
}
