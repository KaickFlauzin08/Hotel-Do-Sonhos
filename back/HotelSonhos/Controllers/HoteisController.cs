using HotelSonhos.Data;
using HotelSonhos.Models;
using HotelSonhos.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace HotelSonhos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoteisController : ControllerBase
    {
        private readonly StayEasyDbContext _context;
        public HoteisController(StayEasyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CriarHotel(CriarHotelDto dto)
        {
            var novohotel = new Hotel
            {
                Nome = dto.Nome,
                QtdEstrelas = dto.QtdEstrelas,
                Cidade = dto.Cidade,
            };
            _context.Hotels.Add(novohotel);
            await _context.SaveChangesAsync();
            return Ok("Hotel Criado com sucesso");
        }

        [HttpGet]
        public async Task<ActionResult<List<HotelDto>>> GetHoteis()
        {
            var hotels = await _context.Hotels
                .Select(a => new HotelDto
                {
                    Id = a.Id,
                    Nome = a.Nome,
                    QtdEstrelas = a.QtdEstrelas,
                })
                .ToListAsync();
            return Ok(hotels);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<DetalhesHotelDto>> GetHoteisById(int id)
        {
            var hotel = await _context.Hotels
                .Include(a => a.Quartos)
                .Where(a => a.Id == id)
                .Select(a => new DetalhesHotelDto
                {
                    Id = a.Id,
                    Cidade = a.Cidade,
                    QtdEstrelas = a.QtdEstrelas,
                    Nome = a.Nome,
                    Quartos = a.Quartos.Select(q => new QuartoDto
                    {
                        Id = q.Id,
                        Tipo = q.Tipo,
                        Preco = q.Preco,

                    }).ToList()
                }).FirstOrDefaultAsync();

            if (hotel == null )
            {
                return NotFound();
            }
            return Ok(hotel);
        }
    }
}
