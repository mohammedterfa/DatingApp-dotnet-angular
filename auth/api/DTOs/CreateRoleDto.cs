using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class CreateRoleDto
{
    [Required(ErrorMessage ="Role Name is required")]
    public string RoleName { get; set; } = null!;

}
