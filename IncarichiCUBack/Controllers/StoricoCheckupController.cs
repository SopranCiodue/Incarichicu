﻿using IncarichiCUServer.Models.StoredProcedure;
using IncarichiCUServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace IncarichiCUServer.Controllers
{
    public class StoricoCheckupController : ControllerBase
    {
        private readonly IntranetSopranDbContext _context;

        public StoricoCheckupController(IntranetSopranDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetIncarichi")]
        public async Task<IEnumerable<SP_StoricoCheckup_GetIncarichi>> GetListIncarichi(int idsam)
        {
            string StoredProc = "exec [SP_StoricoCheckup_GetIncarichi] @idsam =" + idsam;
            var result = await _context.SP_StoricoCheckup_GetIncarichi.FromSqlRaw(StoredProc).ToListAsync();
            return result;
        }
        [HttpGet("GetAllegatiList")]
        public async Task<IEnumerable<SP_StoricoCheckup_GetAllegatiList>> GetListAllegati(string keyord, int haccp, int PrendiAllegato, string Tipologia)
        {
            string StoredProc = "exec [SP_StoricoCheckup_GetAllegatiList] @keyord = '" + keyord +"', @haccp = "+ haccp + ",@PrendiAllegato = " + PrendiAllegato + ",@Tipologia = '" + Tipologia + "'";
            var result = await _context.SP_StoricoCheckup_GetAllegatiList.FromSqlRaw(StoredProc).AsNoTracking().ToListAsync();
            return result;
        }
        [HttpGet("GetAllegatiData")]
        public async Task<IActionResult> GetListAllegatiData(int rientro, string keyord, int haccp, int contatore)
        {
            string storedProc = $"exec [SP_StoricoCheckup_GetAllegatiData] @keyord = '" + keyord + "', @haccp = "+ haccp +", @contatore = " + contatore + ", @rientro = " + rientro;
            var result = _context.SP_StoricoCheckup_GetAllegatiData.FromSqlRaw(storedProc).AsEnumerable().FirstOrDefault();

            string fileName = "FileTest.rar";   
            return new FileContentResult(result.Doc, "application/octet-stream")
            {
                FileDownloadName = fileName
            };
        }
    }

}
