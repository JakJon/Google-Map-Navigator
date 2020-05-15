using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MapExplorerApi.Models;
using Microsoft.AspNetCore.Cors;

namespace MapExplorerApi.Controllers

{
    [EnableCors("MainPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class LatLongsController : ControllerBase
    {
        private readonly MapContext _context;

        public LatLongsController(MapContext context)
        {
            _context = context;
        }

        // GET: api/LatLongs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LatLong>>> GetLatLongs()
        {
            return await _context.LatLongs.ToListAsync();
        }

        // GET: api/LatLongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LatLong>> GetLatLong(long id)
        {
            var latLong = await _context.LatLongs.FindAsync(id);

            if (latLong == null)
            {
                return NotFound();
            }

            return latLong;
        }

        // PUT: api/LatLongs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLatLong(long id, LatLong latLong)
        {
            if (id != latLong.Id)
            {
                return BadRequest();
            }

            _context.Entry(latLong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LatLongExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LatLongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LatLong>> PostLatLong(LatLong latLong)
        {
            _context.LatLongs.Add(latLong);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLatLong), new { id = latLong.Id }, latLong);
        }

        // DELETE: api/LatLongs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LatLong>> DeleteLatLong(long id)
        {
            var latLong = await _context.LatLongs.FindAsync(id);
            if (latLong == null)
            {
                return NotFound();
            }

            _context.LatLongs.Remove(latLong);
            await _context.SaveChangesAsync();

            return latLong;
        }

        private bool LatLongExists(long id)
        {
            return _context.LatLongs.Any(e => e.Id == id);
        }
    }
}
