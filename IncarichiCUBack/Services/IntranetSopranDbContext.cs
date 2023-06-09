using IncarichiCUServer.Models;
using IncarichiCUServer.Models.StoredProcedure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace IncarichiCUServer.Services
{
    public class IntranetSopranDbContext : DbContext
    {
        public IntranetSopranDbContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<SP_StoricoCheckup_GetIncarichi> SP_StoricoCheckup_GetIncarichi { get; set; }
        public virtual DbSet<SP_StoricoCheckup_GetAllegatiList> SP_StoricoCheckup_GetAllegatiList { get; set; }
        public virtual DbSet<SP_StoricoCheckup_GetAllegatiData> SP_StoricoCheckup_GetAllegatiData { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //gestione delle entità senza chiave primaria
            modelBuilder.Entity<SP_StoricoCheckup_GetIncarichi>().HasNoKey();
            modelBuilder.Entity<SP_StoricoCheckup_GetAllegatiData>().HasNoKey();
        }
    }
}
