using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace wgi_api.Models
{
    public class Employee
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string First_name { get; set; }

        [Required]
        [StringLength(100)]
        public string Last_name { get; set; }

        [Required]
        [Url(ErrorMessage = "Valid URL is required")]
        public string Avatar{ get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string Phone_number { get; set; }
    }
}
