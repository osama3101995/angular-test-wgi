using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wgi_api.Models
{
    public class Employee
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string First_name { get; set; }

        [Required]
        [StringLength(100)]
        public string Last_name { get; set; }

        [Required(ErrorMessage = "Please select files")]
        [NotMapped]
        public List<IFormFile> Avatar { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string Phone_number { get; set; }
    }
}
