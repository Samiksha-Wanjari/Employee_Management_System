using Domain.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using System.Reflection;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private readonly DataContext _context;

        public EmployeesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetEmployees")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var allEmployees = _context.Employees.Where(c => !c.IsDeleted).ToList();

            return Ok(allEmployees);

        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            return employee;
        }


        [HttpPost("AddEmployee")]
        public IActionResult AddEmployees(EmployeeDto addEmployeeDto)
        {
            var newemployee = new Employee()
            {
                Fullname = addEmployeeDto.Fullname,
                Email = addEmployeeDto.Email,
                Phone = addEmployeeDto.Phone,
                Gender = addEmployeeDto.Gender,
                Age = addEmployeeDto.Age,
                JobTitle = addEmployeeDto.JobTitle,
                Department = addEmployeeDto.Department,
                IsDeleted = false
              
    };

            _context.Employees.Add(newemployee);
            _context.SaveChanges();
            return Ok(newemployee);
        }




        [HttpPut("[action]/{id}")]
        public IActionResult UpdateEmployee(int id, EmployeeDto updateEmployeeDto)
        {

            var updateEmployee = _context.Employees.Find(id);
            if (updateEmployee == null)
            {
                return NotFound();
            }
            updateEmployee.Fullname = updateEmployeeDto.Fullname;
            updateEmployee.Email = updateEmployeeDto.Email;
            updateEmployee.Phone = updateEmployeeDto.Phone;
            updateEmployee.Age = updateEmployeeDto.Age;
            updateEmployee.Gender = updateEmployeeDto.Gender;
            updateEmployee.JobTitle = updateEmployeeDto.JobTitle;
            updateEmployee.Department = updateEmployeeDto.Department;
            updateEmployee.IsDeleted = false;



            _context.SaveChanges();
            return Ok(updateEmployee);
        }




        // Method For Deleting an employee using Soft Delete so that it does not vanishes from the database
        // If we delete any of the employee, it will be marked as deleted and will not be shown in the list of employees
        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null || employee.IsDeleted)
            {
                return NotFound();
            }

            // Mark the customer as deleted
            employee.IsDeleted = true;

            _context.SaveChanges();
            return Ok();
        }
    }

}
