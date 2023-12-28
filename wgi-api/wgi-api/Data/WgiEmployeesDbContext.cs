using Microsoft.EntityFrameworkCore;
using wgi_api.Models;

namespace wgi_api.Data
{
    public class WgiEmployeesDbContext : DbContext
    {
        public WgiEmployeesDbContext(DbContextOptions options) : base(options) { 
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
