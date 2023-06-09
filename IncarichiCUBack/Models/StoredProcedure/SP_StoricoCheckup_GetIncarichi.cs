namespace IncarichiCUServer.Models.StoredProcedure
{
    public class SP_StoricoCheckup_GetIncarichi
    {
        public string CodiceMago { get; set; }
        public string? Sede { get; set; }
        public string? RagSociale { get; set; }
        public string? Prov { get; set; }
        public string? Cap { get; set; }
        public string? Comune { get; set;}
        public string? Indirizzo { get; set;}
        public string? Key_ord { get; set; }
        public string? Servizio { get; set; }
        public string? Eseguito { get; set; }
        public string? Annullato { get; set; }
        public DateTime? DataFattTecnico { get; set; }
        public int? Haccp { get; set; }



    }
}
