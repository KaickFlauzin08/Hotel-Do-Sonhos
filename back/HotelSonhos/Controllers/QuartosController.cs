using HotelSonhos.Data;
using HotelSonhos.Models;
using HotelSonhos.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelSonhos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuartosController : ControllerBase
    {
        private readonly StayEasyDbContext _context;

        public QuartosController(StayEasyDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CriarQuarto(CriarQuartoDto dto)
        {
            var novoquarto = new Quarto
            {
                HotelId = dto.HotelId,
                Tipo = dto.Tipo,
                Preco = dto.Preco,
            };
            _context.Quartos.Add(novoquarto);
            await _context.SaveChangesAsync();
            return Ok("Quarto criado com sucesso");
        }
        [HttpGet]
        public async Task<ActionResult<List<QuartoDto>>> GetQuartos()
        {
            var quartos = await _context.Quartos
                .Include(a => a.Hotel)
                .Select(a => new QuartoDto
                {
                    Tipo = a.Tipo,
                    Preco = a.Preco,
                    NomeHotel = a.Hotel.Nome,
                    Id = a.Id,
                }).ToListAsync();
            return Ok(quartos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuartoDto>> GetQuartoById(int id)
        {
            var quarto = await _context.Quartos
                .Include(a => a.Hotel)
                .Where(a => a.Id == id)
                .Select(a => new QuartoDto
                {
                    Id = a.Id,
                    Tipo = a.Tipo,
                    Preco = a.Preco,
                    NomeHotel = a.Hotel.Nome
                }).FirstOrDefaultAsync();
            if (quarto == null)
            {
                return NotFound();
            }
            return Ok(quarto);
        }
    }
}
