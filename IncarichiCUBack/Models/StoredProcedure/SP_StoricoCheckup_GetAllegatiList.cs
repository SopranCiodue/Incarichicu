using System.ComponentModel.DataAnnotations;

namespace IncarichiCUServer.Models.StoredProcedure
{
    public class SP_StoricoCheckup_GetAllegatiList
    {
        [Key]
        public string? keyord { get; set; }
        public string? Tipologia { get; set; }
        public string? Partecipante { get; set; }
        public DateTime? DataCorso { get; set; }
        public string? CodiceFiscale { get; set; }
        public string? Mansione { get; set; }
        public string? Modalità { get; set; }

        public int? contatore { get; set; }
        public string? desc { get; set; }
        public DateTime? DataAllegato { get; set; }
        public DateTime? Data_Rientro { get; set; }
        public string? Rientrato { get; set; }
    }
}
