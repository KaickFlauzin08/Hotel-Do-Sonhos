using HotelSonhos.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelSonhos.Data
{
    public class StayEasyDbContext : DbContext
    {
        public StayEasyDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Quarto> Quartos { get; set; }
    }
}
