using System.ComponentModel.DataAnnotations;

namespace IncarichiCUServer.Models.StoredProcedure
{
    public class SP_StoricoCheckup_GetAllegatiList
    {
        [Key]
        public string keyord { get; set; }

        public int contatore { get; set; }
        public string? desc { get; set; }
        public DateTime? DataAllegato { get; set; }
        public DateTime? Data_Rientro { get; set; }
        public string? Rientrato { get; set; }
    }
}
