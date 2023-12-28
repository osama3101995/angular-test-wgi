using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wgi_api.Data;
using wgi_api.Models;

namespace wgi_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly WgiEmployeesDbContext _wgiEmployeesDbContext;

        public EmployeesController(WgiEmployeesDbContext wgiEmployeesDbContext)
        {
            _wgiEmployeesDbContext = wgiEmployeesDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _wgiEmployeesDbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(Guid id)
        {
            var employee = await _wgiEmployeesDbContext.Employees.FindAsync(id);
            return Ok(employee);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchEmployee([FromQuery] string q)
        {
            var employees = await _wgiEmployeesDbContext.Employees
            .Where(e =>

            EF.Functions.Like(e.First_name, $"%{q}%") ||
            EF.Functions.Like(e.Last_name, $"%{q}%") ||
            EF.Functions.Like(e.Position, $"%{q}%") ||
            EF.Functions.Like(e.Phone_number, $"%{q}%"))
            .ToListAsync();
            //var employee = await _wgiEmployeesDbContext.Employees.FindAsync(id);
            return Ok(employees);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            employee.Id = Guid.NewGuid();

            await _wgiEmployeesDbContext.Employees.AddAsync(employee);
            await _wgiEmployeesDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditEmployee([FromBody] Employee employee) {
            


            var employeeExists = await _wgiEmployeesDbContext.Employees.FirstAsync(item => item.Id == employee.Id);
            if (employeeExists != null)
            {

                _wgiEmployeesDbContext.Entry(employeeExists).CurrentValues.SetValues(employee);
                var result = await _wgiEmployeesDbContext.SaveChangesAsync();

                return Ok(employeeExists);

            }

            else {

                return BadRequest("Employee Data Found");
            }
            
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEmployee(Guid id) {

            var employee = await _wgiEmployeesDbContext.Employees.FindAsync(id);
            _wgiEmployeesDbContext.Employees.Remove(employee);
            await _wgiEmployeesDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
